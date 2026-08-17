const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
    response.send("Backend Server Running");
});

app.get("/transactions", (request, response) => {

    const sql = `
        SELECT *
        FROM transactions
        ORDER BY transaction_date DESC
    `;

    db.query(sql, (error, result) => {

        if (error) {
            response.status(500).json(error);
        } else {
            response.json(result);
        }

    });

});

app.post("/transactions", (request, response) => {
    const {
        transaction_name,
        amount,
        type,
        category,
        transaction_date,
        payment_method
    } = request.body;

    const sql = `
        INSERT INTO transactions
        (
            transaction_name,
            amount,
            type,
            category,
            transaction_date,
            payment_method
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            transaction_name,
            amount,
            type,
            category,
            transaction_date,
            payment_method
        ],
        (error, result) => {
            if (error) {
                response.status(500).json(error);
            } else {
                response.json({
                    message: "Transaction Added Successfully"
                });
            }
        }
    );
});

app.delete("/transactions/:id", (request, response) => {
    const { id } = request.params;

    const sql = `
        DELETE FROM transactions
        WHERE id = ?
    `;

    db.query(sql, [id], (error, result) => {

        if (error) {
            response.status(500).json(error);
        }

        else {

            response.json({
                message: "Transaction Deleted Successfully"
            });

        }

    });

});

app.get("/spending-over-time", (request, response) => {

    const sql = `
        SELECT
            MONTH(transaction_date) AS month_number,
            DATE_FORMAT(
                MIN(transaction_date),
                '%b'
            ) AS month,
            SUM(amount) AS total_expense
        FROM transactions
        WHERE type = 'Expense'
        GROUP BY MONTH(transaction_date)
        ORDER BY month_number;
    `;

    db.query(sql, (error, result) => {

        if (error) {
            response.status(500).json(error);
        } else {
            response.json(result);
        }

    });

});

app.post("/budgets", (request, response) => {

    const {
        category,
        budget_amount,
        budget_month,
        budget_year
    } = request.body;

    const sql = `
        INSERT INTO budgets
        (
            category,
            budget_amount,
            budget_month,
            budget_year
        )
        VALUES (?, ?, ?, ?)

        ON DUPLICATE KEY UPDATE
        budget_amount = VALUES(budget_amount)
    
    `;

    db.query(
        sql,
        [
            category,
            budget_amount,
            budget_month,
            budget_year
        ],
        (error, result) => {

            if (error) {
                response.status(500).json(error);
            } else {
                response.json({
                    message: "Budget Saved Successfully"
                });
            }

        }
    );

});

app.get("/budgets", (request, response) => {
    const { month, year } = request.query;

    const sql = `
    SELECT

        c.category,

        b.budget_id,

        COALESCE(
            b.budget_amount,
            0
        ) AS budget_amount,

        COALESCE(
            SUM(
                CASE
                    WHEN t.type='Expense'
                    THEN t.amount
                    ELSE 0
                END
            ),
            0
        ) AS spent

    FROM
    (
        SELECT 'Bills' AS category
        UNION ALL
        SELECT 'Food'
        UNION ALL
        SELECT 'Entertainment'
        UNION ALL
        SELECT 'Travel'
    ) c

    LEFT JOIN budgets b

    ON c.category = b.category
    AND b.budget_month = ?
    AND b.budget_year = ?

    LEFT JOIN transactions t

    ON c.category = t.category
    AND t.type='Expense'
    AND MONTH(t.transaction_date)=?
    AND YEAR(t.transaction_date)=?

    GROUP BY

        c.category,
        b.budget_id,
        b.budget_amount

    ORDER BY c.category;
    `;

    db.query(sql,[month, year, month, year],(error,result)=>{

        if(error){
            return response.status(500).json(error);
        }

        const budgets=result.map(item=>{

            const budget=Number(item.budget_amount);

            const spent=Number(item.spent);

            const remaining=budget-spent;

            const actualPercentage=
                budget===0
                ?0
                :(spent/budget)*100;

            return {

                budget_id: item.budget_id || null,

                category: item.category,

                budget_amount: budget,

                spent,

                remaining,

                percentage: actualPercentage,

                display_percentage:
                    actualPercentage > 100
                        ? 110
                        : actualPercentage,

                budgetExists: item.budget_id !== null

            };
        });

        response.json(budgets);

    });

});

app.put("/budgets/:id", (request, response) => {

    const { id } = request.params;
    const { budget_amount } = request.body;

    const sql = `
        UPDATE budgets
        SET budget_amount = ?
        WHERE budget_id = ?
    `;

    db.query(
        sql,
        [budget_amount, id],
        (error) => {

            if (error) {
                return response.status(500).json(error);
            }

            response.json({
                message: "Budget Updated Successfully"
            });

        }
    );

});

app.get("/report-summary", (request, response) => {

    const { month, year } = request.query;

    const sql = `
        SELECT

            COALESCE(
                SUM(
                    CASE
                        WHEN type = 'Income'
                        THEN amount
                        ELSE 0
                    END
                ),
                0
            ) AS totalIncome,

            COALESCE(
                SUM(
                    CASE
                        WHEN type = 'Expense'
                        THEN amount
                        ELSE 0
                    END
                ),
                0
            ) AS totalExpense,

            COUNT(*) AS totalTransactions

        FROM transactions

        WHERE
            MONTH(transaction_date) = ?
            AND YEAR(transaction_date) = ?
    `;

    db.query(
        sql,
        [month, year],
        (error, result) => {

            if (error) {
                return response.status(500).json(error);
            }

            const incomeMonthly =
                Number(result[0].totalIncome);

            const expenseMonthly =
                Number(result[0].totalExpense);

            response.json({

                incomeMonthly,

                expenseMonthly,

                savingMonthly: incomeMonthly - expenseMonthly,

                transactionMonthly:
                    Number(result[0].totalTransactions)

            });

        }
    );

});

app.get("/report-income-expense", (request, response) => {
    const { year } = request.query;
    const sql = `
        SELECT

            MONTH(transaction_date) AS month,

            SUM(
                CASE
                    WHEN type = 'Income'
                    THEN amount
                    ELSE 0
                END
            ) AS income,

            SUM(
                CASE
                    WHEN type = 'Expense'
                    THEN amount
                    ELSE 0
                END
            ) AS expense

        FROM transactions

        WHERE YEAR(transaction_date) = ?

        GROUP BY MONTH(transaction_date)

        ORDER BY MONTH(transaction_date);
    `;
    db.query(
        sql,
        [year],
        (error, result) => {

            if (error) {
                return response.status(500).json(error);
            }

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
            for (let month = 1; month <= 12; month++) {
                const currentMonth = result.find(
                    item => item.month === month
                );
                chartData.push({
                    month: monthNames[month - 1],
                    income: currentMonth
                        ? Number(currentMonth.income)
                        : 0,
                    expense: currentMonth
                        ? Number(currentMonth.expense)
                        : 0
                });
            }
            response.json(chartData);
        }
    );
});

/*
app.get("/report-income-expense", (request, response) => {

    const { year } = request.query;

    const sql = `
        SELECT

            MONTH(transaction_date) AS month,

            SUM(
                CASE
                    WHEN type = 'Income'
                    THEN amount
                    ELSE 0
                END
            ) AS income,

            SUM(
                CASE
                    WHEN type = 'Expense'
                    THEN amount
                    ELSE 0
                END
            ) AS expense

        FROM transactions

        WHERE YEAR(transaction_date) = ?

        GROUP BY MONTH(transaction_date)

        ORDER BY MONTH(transaction_date);
    `;

    db.query(
        sql,
        [year],
        (error, result) => {

            if (error) {
                return response.status(500).json(error);
            }

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

            let runningIncome = 0;
            let runningExpense = 0;

            const chartData = [];

            for (let month = 1; month <= 12; month++) {

                const currentMonth = result.find(
                    item => item.month === month
                );

                const monthlyIncome = currentMonth
                    ? Number(currentMonth.income)
                    : 0;

                const monthlyExpense = currentMonth
                    ? Number(currentMonth.expense)
                    : 0;

                runningIncome += monthlyIncome;
                runningExpense += monthlyExpense;

                chartData.push({
                    month: monthNames[month - 1],
                    income: runningIncome,
                    expense: runningExpense
                });

            }

            response.json(chartData);

        }
    );

});
*/

app.get("/report-budget-vs-actual", (request, response) => {
    const { month, year, category } = request.query;
    const sql = `
        SELECT

            b.budget_amount,

            COALESCE(
                SUM(
                    CASE
                        WHEN t.type = 'Expense'
                        THEN t.amount
                        ELSE 0
                    END
                ),
                0
            ) AS spent

        FROM budgets b

        LEFT JOIN transactions t

        ON b.category = t.category

        AND t.type = 'Expense'

        AND MONTH(t.transaction_date) = ?

        AND YEAR(t.transaction_date) = ?

        WHERE b.category = ?

        AND b.budget_month = ?

        AND b.budget_year = ?

        GROUP BY b.budget_amount;
    `;

    db.query(
        sql,
        [
            month,
            year,
            category,
            month,
            year
        ],
        (error, result) => {

            if (error) {
                return response.status(500).json(error);
            }

            if (result.length === 0) {

                return response.json({
                    category,
                    budget: 0,
                    spent: 0,
                    remaining: 0,
                    budgetExists: false
                });

            }

            const budget = Number(result[0].budget_amount);
            const spent = Number(result[0].spent);

            response.json({

                category,

                budget,

                spent,

                remaining: budget - spent,

                budgetExists: true

            });

        }
    );

});

app.get("/report-expense-category", (request, response) => {

    const { month, year } = request.query;

    const sql = `
        SELECT

            category,

            COALESCE(
                SUM(amount),
                0
            ) AS total_expense

        FROM transactions

        WHERE
            type = 'Expense'

        AND
            MONTH(transaction_date) = ?

        AND
            YEAR(transaction_date) = ?

        GROUP BY category

        ORDER BY category;
    `;

    db.query(
        sql,
        [month, year],
        (error, result) => {

            if (error) {
                return response.status(500).json(error);
            }

            const categories = [
                "Food",
                "Bills",
                "Entertainment",
                "Travel"
            ];

            const chartData = categories.map(category => {

                const currentCategory = result.find(
                    item => item.category === category
                );

                return {
                    category: category,

                    expense: currentCategory
                        ? Number(currentCategory.total_expense)
                        : 0
                };

            });

            response.json(chartData);

        }
    );

});

app.get("/report-category-performance", (request, response) => {

    const { month, year } = request.query;

    const selectedMonth = Number(month);
    const selectedYear = Number(year);

    let previousMonth = selectedMonth - 1;
    let previousYear = selectedYear;

    if (previousMonth === 0) {
        previousMonth = 12;
        previousYear = selectedYear - 1;
    }

    const sql = `
        SELECT
            category,

            COALESCE(
                SUM(
                    CASE
                        WHEN MONTH(transaction_date) = ?
                        AND YEAR(transaction_date) = ?
                        THEN amount
                        ELSE 0
                    END
                ),
                0
            ) AS current_expense,

            COALESCE(
                SUM(
                    CASE
                        WHEN MONTH(transaction_date) = ?
                        AND YEAR(transaction_date) = ?
                        THEN amount
                        ELSE 0
                    END
                ),
                0
            ) AS previous_expense

        FROM transactions

        WHERE
            type = 'Expense'

        AND
            (
                (
                    MONTH(transaction_date) = ?
                    AND YEAR(transaction_date) = ?
                )
                OR
                (
                    MONTH(transaction_date) = ?
                    AND YEAR(transaction_date) = ?
                )
            )

        GROUP BY category

        ORDER BY category;
    `;

    db.query(
        sql,
        [
            selectedMonth,
            selectedYear,

            previousMonth,
            previousYear,

            selectedMonth,
            selectedYear,

            previousMonth,
            previousYear
        ],
        (error, result) => {

            if (error) {
                return response.status(500).json(error);
            }

            const categories = [
                "Food",
                "Bills",
                "Entertainment",
                "Travel"
            ];

            const categoryData = categories.map(category => {

                const item = result.find(
                    row => row.category === category
                );

                const currentExpense = item
                    ? Number(item.current_expense)
                    : 0;

                const previousExpense = item
                    ? Number(item.previous_expense)
                    : 0;

                let change = "same";

                if (previousExpense === 0 && currentExpense > 0) {
                    change = "up";
                }
                else if (
                    currentExpense > previousExpense
                ) {
                    change = "up";
                }
                else if (
                    currentExpense < previousExpense
                ) {
                    change = "down";
                }

                return {
                    category,
                    expense: currentExpense,
                    change
                };

            });

            response.json(categoryData);

        }
    );

});

app.get("/report-recent-transactions", (request, response) => {

    const { month, year } = request.query;

    const sql = `
        SELECT
            id,
            transaction_date,
            transaction_name,
            category,
            type,
            amount,
            payment_method

        FROM transactions

        WHERE
            MONTH(transaction_date) = ?
        AND
            YEAR(transaction_date) = ?

        ORDER BY transaction_date ASC, id DESC;
    `;

    db.query(
        sql,
        [month, year],
        (error, result) => {

            if (error) {
                return response.status(500).json(error);
            }

            response.json(result);

        }
    );

});

app.get("/report-smart-insights", (request, response) => {

    const { month, year } = request.query;

    const sql = `
        SELECT
            category,

            SUM(amount) AS expense,

            COUNT(*) AS transaction_count

        FROM transactions

        WHERE
            type = 'Expense'

        AND
            MONTH(transaction_date) = ?

        AND
            YEAR(transaction_date) = ?

        GROUP BY category

        ORDER BY expense DESC;
    `;

    db.query(
        sql,
        [month, year],
        (error, result) => {

            if (error) {
                return response.status(500).json(error);
            }

            const categoryData = result.map(item => ({
                category: item.category,
                expense: Number(item.expense),
                transactionCount: Number(item.transaction_count)
            }));

            const totalExpense = categoryData.reduce(
                (total, item) => total + item.expense,
                0
            );

            const highestCategory =
                categoryData.length > 0
                    ? categoryData[0]
                    : null;

            const lowestCategory =
                categoryData.length > 0
                    ? categoryData[categoryData.length - 1]
                    : null;

            response.json({

                totalExpense,

                highestCategory,

                lowestCategory,

                categoryData

            });

        }
    );

});

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});