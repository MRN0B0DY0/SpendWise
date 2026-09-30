const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const data = require("./db");
const JWT_SECRET = "SPENDWISE_SECRET_KEY";

app.use(cors());
app.use(express.json());

const getUserTransactions = userId => {
    return data.transactions.filter(
        transaction => transaction.user_id === userId
    );
};

const getUserBudgets = userId => {
    return data.budgets.filter(
        budget => budget.user_id === userId
    );
};

const getExpenses = transactions => {
    return transactions.filter(
        transaction => transaction.type === "Expense"
    );
};

const getIncome = transactions => {
    return transactions.filter(
        transaction => transaction.type === "Income"
    );
};

const getMonth = date => {
    return new Date(date).getMonth() + 1;
};

const getYear = date => {
    return new Date(date).getFullYear();
};

const categories = [
    "Food",
    "Bills",
    "Entertainment",
    "Travel"
];

const authenticateToken = (request, response, next) => {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return response.status(401).json({
            message: "Access token required"
        });
    }

    jwt.verify(
        token,
        JWT_SECRET,
        (error, user) => {
            if (error) {
                return response.status(403).json({
                    message: "Invalid or expired token"
                });
            }

            request.user = user;
            next();
        }
    );
};

app.get("/", (request, response) => {
    response.send("Backend Server Running");
});

app.get(
    "/transactions",
    authenticateToken,
    (request, response) => {
        const userId = request.user.userId;

        const transactions = getUserTransactions(userId)
            .sort(
                (a, b) =>
                    new Date(b.transaction_date) -
                    new Date(a.transaction_date)
            );

        response.json(transactions);
    }
);

app.post(
    "/transactions",
    authenticateToken,
    (request, response) => {
        const {
            transaction_name,
            amount,
            type,
            category,
            transaction_date,
            payment_method
        } = request.body;

        const userId = request.user.userId;

        const ids = data.transactions.map(
            transaction => Number(transaction.id)
        );

        const newId =
            ids.length > 0
                ? Math.max(...ids) + 1
                : 1;

        const newTransaction = {
            id: newId,
            transaction_name,
            amount: Number(amount),
            type,
            category,
            transaction_date,
            payment_method,
            created_at: new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
            user_id: userId
        };

        data.transactions.push(newTransaction);

        response.json({
            message: "Transaction Added Successfully",
            transactionId: newId
        });
    }
);

app.delete(
    "/transactions/:id",
    authenticateToken,
    (request, response) => {
        const id = Number(request.params.id);
        const userId = request.user.userId;

        const transactionIndex =
            data.transactions.findIndex(
                transaction =>
                    Number(transaction.id) === id &&
                    transaction.user_id === userId
            );

        if (transactionIndex === -1) {
            return response.status(404).json({
                message: "Transaction not found"
            });
        }

        data.transactions.splice(
            transactionIndex,
            1
        );

        response.json({
            message: "Transaction Deleted Successfully"
        });
    }
);

app.get(
    "/spending-over-time",
    authenticateToken,
    (request, response) => {
        const userId = request.user.userId;

        const transactions =
            getExpenses(
                getUserTransactions(userId)
            );

        const monthlyData = {};

        transactions.forEach(transaction => {
            const monthNumber =
                getMonth(transaction.transaction_date);

            const monthName =
                new Date(
                    transaction.transaction_date
                ).toLocaleString(
                    "en-US",
                    {
                        month: "short"
                    }
                );

            if (!monthlyData[monthNumber]) {
                monthlyData[monthNumber] = {
                    month_number: monthNumber,
                    month: monthName,
                    total_expense: 0
                };
            }

            monthlyData[monthNumber].total_expense +=
                Number(transaction.amount);
        });

        const result = Object.values(monthlyData)
            .sort(
                (a, b) =>
                    a.month_number -
                    b.month_number
            );

        response.json(result);
    }
);

app.post(
    "/budgets",
    authenticateToken,
    (request, response) => {
        const {
            category,
            budget_amount,
            budget_month,
            budget_year
        } = request.body;

        const userId = request.user.userId;

        const existingBudget =
            data.budgets.find(
                budget =>
                    budget.user_id === userId &&
                    budget.category === category &&
                    Number(budget.budget_month) ===
                        Number(budget_month) &&
                    Number(budget.budget_year) ===
                        Number(budget_year)
            );

        if (existingBudget) {
            existingBudget.budget_amount =
                Number(budget_amount);

            return response.json({
                message: "Budget Saved Successfully",
                budgetId: existingBudget.budget_id
            });
        }

        const ids = data.budgets.map(
            budget => Number(budget.budget_id)
        );

        const newBudgetId =
            ids.length > 0
                ? Math.max(...ids) + 1
                : 1;

        const newBudget = {
            budget_id: newBudgetId,
            category,
            budget_amount: Number(budget_amount),
            created_at: new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
            budget_month: Number(budget_month),
            budget_year: Number(budget_year),
            user_id: userId
        };

        data.budgets.push(newBudget);

        response.json({
            message: "Budget Saved Successfully",
            budgetId: newBudgetId
        });
    }
);

app.get(
    "/budgets",
    authenticateToken,
    (request, response) => {
        const {
            month,
            year
        } = request.query;

        const userId = request.user.userId;

        const userBudgets =
            getUserBudgets(userId);

        const userTransactions =
            getUserTransactions(userId);

        const result = categories.map(
            category => {

                const budget =
                    userBudgets.find(
                        item =>
                            item.category === category &&
                            Number(item.budget_month) ===
                                Number(month) &&
                            Number(item.budget_year) ===
                                Number(year)
                    );

                const spent =
                    userTransactions
                        .filter(
                            transaction =>
                                transaction.type ===
                                    "Expense" &&
                                transaction.category ===
                                    category &&
                                getMonth(
                                    transaction.transaction_date
                                ) === Number(month) &&
                                getYear(
                                    transaction.transaction_date
                                ) === Number(year)
                        )
                        .reduce(
                            (total, transaction) =>
                                total +
                                Number(transaction.amount),
                            0
                        );

                const budgetAmount =
                    budget
                        ? Number(
                            budget.budget_amount
                        )
                        : 0;

                const remaining =
                    budgetAmount - spent;

                const actualPercentage =
                    budgetAmount === 0
                        ? 0
                        : (spent / budgetAmount) *
                          100;

                return {
                    budget_id:
                        budget
                            ? budget.budget_id
                            : null,

                    category,

                    budget_amount:
                        budgetAmount,

                    spent,

                    remaining,

                    percentage:
                        actualPercentage,

                    display_percentage:
                        actualPercentage > 100
                            ? 110
                            : actualPercentage,

                    budgetExists:
                        Boolean(budget)
                };
            }
        );

        response.json(result);
    }
);

app.put(
    "/budgets/:id",
    authenticateToken,
    (request, response) => {
        const id =
            Number(request.params.id);

        const {
            budget_amount
        } = request.body;

        const userId =
            request.user.userId;

        const budget =
            data.budgets.find(
                item =>
                    Number(item.budget_id) === id &&
                    item.user_id === userId
            );

        if (!budget) {
            return response.status(404).json({
                message:
                    "Budget not found or unauthorized"
            });
        }

        budget.budget_amount =
            Number(budget_amount);

        response.json({
            message:
                "Budget Updated Successfully"
        });
    }
);

app.get(
    "/report-summary",
    authenticateToken,
    (request, response) => {
        const {
            month,
            year
        } = request.query;

        const userId =
            request.user.userId;

        const transactions =
            getUserTransactions(userId)
                .filter(
                    transaction =>
                        getMonth(
                            transaction.transaction_date
                        ) === Number(month) &&
                        getYear(
                            transaction.transaction_date
                        ) === Number(year)
                );

        const incomeMonthly =
            getIncome(transactions)
                .reduce(
                    (total, transaction) =>
                        total +
                        Number(transaction.amount),
                    0
                );

        const expenseMonthly =
            getExpenses(transactions)
                .reduce(
                    (total, transaction) =>
                        total +
                        Number(transaction.amount),
                    0
                );

        response.json({
            incomeMonthly,

            expenseMonthly,

            savingMonthly:
                incomeMonthly -
                expenseMonthly,

            transactionMonthly:
                transactions.length
        });
    }
);

app.get(
    "/report-income-expense",
    authenticateToken,
    (request, response) => {
        const {
            year
        } = request.query;

        const userId =
            request.user.userId;

        const transactions =
            getUserTransactions(userId)
                .filter(
                    transaction =>
                        getYear(
                            transaction.transaction_date
                        ) === Number(year)
                );

        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        const chartData = [];

        for (
            let month = 1;
            month <= 12;
            month++
        ) {
            const monthlyTransactions =
                transactions.filter(
                    transaction =>
                        getMonth(
                            transaction.transaction_date
                        ) === month
                );

            const income =
                getIncome(
                    monthlyTransactions
                ).reduce(
                    (total, transaction) =>
                        total +
                        Number(transaction.amount),
                    0
                );

            const expense =
                getExpenses(
                    monthlyTransactions
                ).reduce(
                    (total, transaction) =>
                        total +
                        Number(transaction.amount),
                    0
                );

            chartData.push({
                month:
                    monthNames[month - 1],

                income,

                expense
            });
        }

        response.json(chartData);
    }
);

app.get(
    "/report-budget-vs-actual",
    authenticateToken,
    (request, response) => {
        const {
            month,
            year,
            category
        } = request.query;

        const userId =
            request.user.userId;

        const budget =
            getUserBudgets(userId).find(
                item =>
                    item.category === category &&
                    Number(item.budget_month) ===
                        Number(month) &&
                    Number(item.budget_year) ===
                        Number(year)
            );

        const spent =
            getExpenses(
                getUserTransactions(userId)
            )
                .filter(
                    transaction =>
                        transaction.category ===
                            category &&
                        getMonth(
                            transaction.transaction_date
                        ) === Number(month) &&
                        getYear(
                            transaction.transaction_date
                        ) === Number(year)
                )
                .reduce(
                    (total, transaction) =>
                        total +
                        Number(transaction.amount),
                    0
                );

        if (!budget) {
            return response.json({
                category,

                budget: 0,

                spent,

                remaining: 0 - spent,

                budgetExists: false
            });
        }

        const budgetAmount =
            Number(
                budget.budget_amount
            );

        response.json({
            category,

            budget:
                budgetAmount,

            spent,

            remaining:
                budgetAmount - spent,

            budgetExists: true
        });
    }
);

app.get(
    "/report-expense-category",
    authenticateToken,
    (request, response) => {
        const {
            month,
            year
        } = request.query;

        const userId =
            request.user.userId;

        const transactions =
            getExpenses(
                getUserTransactions(userId)
            );

        const chartData =
            categories.map(
                category => {

                    const expense =
                        transactions
                            .filter(
                                transaction =>
                                    transaction.category ===
                                        category &&
                                    getMonth(
                                        transaction.transaction_date
                                    ) === Number(month) &&
                                    getYear(
                                        transaction.transaction_date
                                    ) === Number(year)
                            )
                            .reduce(
                                (
                                    total,
                                    transaction
                                ) =>
                                    total +
                                    Number(
                                        transaction.amount
                                    ),
                                0
                            );

                    return {
                        category,

                        expense
                    };
                }
            );

        response.json(chartData);
    }
);

app.get(
    "/report-category-performance",
    authenticateToken,
    (request, response) => {
        const {
            month,
            year
        } = request.query;

        const userId =
            request.user.userId;

        const selectedMonth =
            Number(month);

        const selectedYear =
            Number(year);

        let previousMonth =
            selectedMonth - 1;

        let previousYear =
            selectedYear;

        if (previousMonth === 0) {
            previousMonth = 12;
            previousYear =
                selectedYear - 1;
        }

        const transactions =
            getExpenses(
                getUserTransactions(userId)
            );

        const categoryData =
            categories.map(
                category => {

                    const currentExpense =
                        transactions
                            .filter(
                                transaction =>
                                    transaction.category ===
                                        category &&
                                    getMonth(
                                        transaction.transaction_date
                                    ) ===
                                        selectedMonth &&
                                    getYear(
                                        transaction.transaction_date
                                    ) ===
                                        selectedYear
                            )
                            .reduce(
                                (
                                    total,
                                    transaction
                                ) =>
                                    total +
                                    Number(
                                        transaction.amount
                                    ),
                                0
                            );

                    const previousExpense =
                        transactions
                            .filter(
                                transaction =>
                                    transaction.category ===
                                        category &&
                                    getMonth(
                                        transaction.transaction_date
                                    ) ===
                                        previousMonth &&
                                    getYear(
                                        transaction.transaction_date
                                    ) ===
                                        previousYear
                            )
                            .reduce(
                                (
                                    total,
                                    transaction
                                ) =>
                                    total +
                                    Number(
                                        transaction.amount
                                    ),
                                0
                            );

                    let change = "same";

                    if (
                        previousExpense === 0 &&
                        currentExpense > 0
                    ) {
                        change = "up";
                    }
                    else if (
                        currentExpense >
                        previousExpense
                    ) {
                        change = "up";
                    }
                    else if (
                        currentExpense <
                        previousExpense
                    ) {
                        change = "down";
                    }

                    return {
                        category,

                        expense:
                            currentExpense,

                        change
                    };
                }
            );

        response.json(categoryData);
    }
);

app.get(
    "/report-recent-transactions",
    authenticateToken,
    (request, response) => {
        const {
            month,
            year
        } = request.query;

        const userId =
            request.user.userId;

        const result =
            getUserTransactions(userId)
                .filter(
                    transaction =>
                        getMonth(
                            transaction.transaction_date
                        ) === Number(month) &&
                        getYear(
                            transaction.transaction_date
                        ) === Number(year)
                )
                .sort(
                    (a, b) => {

                        const dateDifference =
                            new Date(
                                a.transaction_date
                            ) -
                            new Date(
                                b.transaction_date
                            );

                        if (
                            dateDifference !== 0
                        ) {
                            return dateDifference;
                        }

                        return (
                            Number(b.id) -
                            Number(a.id)
                        );
                    }
                )
                .map(
                    transaction => ({
                        id:
                            transaction.id,

                        transaction_date:
                            transaction.transaction_date,

                        transaction_name:
                            transaction.transaction_name,

                        category:
                            transaction.category,

                        type:
                            transaction.type,

                        amount:
                            Number(
                                transaction.amount
                            ),

                        payment_method:
                            transaction.payment_method
                    })
                );

        response.json(result);
    }
);

app.get(
    "/report-smart-insights",
    authenticateToken,
    (request, response) => {
        const {
            month,
            year
        } = request.query;

        const userId =
            request.user.userId;

        const transactions =
            getExpenses(
                getUserTransactions(userId)
            ).filter(
                transaction =>
                    getMonth(
                        transaction.transaction_date
                    ) === Number(month) &&
                    getYear(
                        transaction.transaction_date
                    ) === Number(year)
            );

        const categoryData =
            categories.map(
                category => {

                    const categoryTransactions =
                        transactions.filter(
                            transaction =>
                                transaction.category ===
                                category
                        );

                    const expense =
                        categoryTransactions.reduce(
                            (
                                total,
                                transaction
                            ) =>
                                total +
                                Number(
                                    transaction.amount
                                ),
                            0
                        );

                    return {
                        category,

                        expense,

                        transactionCount:
                            categoryTransactions.length
                    };
                }
            )
            .filter(
                item =>
                    item.transactionCount > 0
            )
            .sort(
                (a, b) =>
                    b.expense -
                    a.expense
            );

        const totalExpense =
            categoryData.reduce(
                (total, item) =>
                    total + item.expense,
                0
            );

        const highestCategory =
            categoryData.length > 0
                ? categoryData[0]
                : null;

        const lowestCategory =
            categoryData.length > 0
                ? categoryData[
                    categoryData.length - 1
                ]
                : null;

        response.json({
            totalExpense,

            highestCategory,

            lowestCategory,

            categoryData
        });
    }
);


app.get(
    "/profile-stats",
    authenticateToken,
    (request, response) => {
        const userId =
            request.user.userId;

        const transactions =
            getUserTransactions(userId);

        const totalIncome =
            getIncome(transactions)
                .reduce(
                    (total, transaction) =>
                        total +
                        Number(transaction.amount),
                    0
                );

        const totalExpense =
            getExpenses(transactions)
                .reduce(
                    (total, transaction) =>
                        total +
                        Number(transaction.amount),
                    0
                );

        const savings =
            totalIncome -
            totalExpense;

        response.json({
            totalIncome,

            totalExpense,

            savings,

            transactionCount:
                transactions.length
        });
    }
);


app.put(
    "/profile",
    authenticateToken,
    (request, response) => {
        const {
            first_name,
            last_name
        } = request.body;

        const userId =
            request.user.userId;

        const user =
            data.users.find(
                item =>
                    Number(item.id) ===
                    userId
            );

        if (!user) {
            return response.status(404).json({
                message:
                    "User not found"
            });
        }

        user.first_name =
            first_name;

        user.last_name =
            last_name;

        response.json({
            message:
                "Profile Updated Successfully"
        });
    }
);

app.post(
    "/login",
    async (request, response) => {
        const {
            email,
            password
        } = request.body;

        const user =
            data.users.find(
                item =>
                    item.email === email
            );

        if (!user) {
            return response.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password_hash
            );

        if (!passwordMatch) {
            return response.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        const token =
            jwt.sign(
                {
                    userId: user.id,

                    email: user.email
                },
                JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

        response.json({
            message:
                "Login successful",

            token,

            user: {
                id:
                    user.id,

                firstName:
                    user.first_name,

                lastName:
                    user.last_name,

                email:
                    user.email
            }
        });
    }
);

app.get(
    "/me",
    authenticateToken,
    (request, response) => {
        const user =
            data.users.find(
                item =>
                    Number(item.id) ===
                    request.user.userId
            );

        if (!user) {
            return response.status(404).json({
                message:
                    "User not found"
            });
        }

        response.json({
            id:
                user.id,

            first_name:
                user.first_name,

            last_name:
                user.last_name,

            email:
                user.email
        });
    }
);

app.listen(5000, () => {
    console.log(
        "Server Running on Port 5000"
    );
});