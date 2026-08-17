export const addTransaction = async transactionData => {
    const response = await fetch(
        "http://localhost:5000/transactions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transactionData)
        }
    );

    return response.json();
};

export const getTransactions = async () => {

    const response = await fetch(
        "http://localhost:5000/transactions"
    );

    return response.json();
};

export const deleteTransaction = async id => {
    const response = await fetch(
        `http://localhost:5000/transactions/${id}`,
        {
            method: "DELETE"
        }
    );

    return response.json();
};

export const getSpendingOverTime = async () => {

    const response = await fetch(
        "http://localhost:5000/spending-over-time"
    );

    return response.json();

};

export const getBudgets = async (month, year) => {

    const response = await fetch(
        `http://localhost:5000/budgets?month=${month}&year=${year}`
    );

    return response.json();

};

export const updateBudget = async (
    budgetId,
    budgetAmount
) => {

    const response = await fetch(
        `http://localhost:5000/budgets/${budgetId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                budget_amount: budgetAmount
            })
        }
    );

    return response.json();

};

export const createBudget = async (
    category,
    budgetAmount,
    budgetMonth,
    budgetYear
) => {

    const response = await fetch(
        "http://localhost:5000/budgets",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category,
                budget_amount: budgetAmount,
                budget_month: budgetMonth,
                budget_year: budgetYear
            })
        }
    );

    return response.json();

};

export const getReportSummary = async (
    month, 
    year
) => {

    const response = await fetch(
        `http://localhost:5000/report-summary?month=${month}&year=${year}`
    );

    return response.json();

};

export const getIncomeVsExpenseChart = async year => {

    const response = await fetch(
        `http://localhost:5000/report-income-expense?year=${year}`
    );

    return response.json();

};

export const getBudgetVsActual = async (
    month,
    year,
    category
) => {

    const response = await fetch(
        `http://localhost:5000/report-budget-vs-actual?month=${month}&year=${year}&category=${category}`
    );

    return response.json();

};

export const getExpenseByCategory = async (
    month,
    year
) => {

    const response = await fetch(
        `http://localhost:5000/report-expense-category?month=${month}&year=${year}`
    );

    return response.json();

};

export const getCategoryPerformance = async (
    month,
    year
) => {

    const response = await fetch(
        `http://localhost:5000/report-category-performance?month=${month}&year=${year}`
    );

    return response.json();

};

export const getReportRecentTransactions = async (
    month,
    year
) => {

    const response = await fetch(
        `http://localhost:5000/report-recent-transactions?month=${month}&year=${year}`
    );

    return response.json();

};

export const getSmartInsights = async (
    month,
    year
) => {

    const response = await fetch(
        `http://localhost:5000/report-smart-insights?month=${month}&year=${year}`
    );

    return response.json();

};