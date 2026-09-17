const handleResponse = async (response) => {
    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.replace("/");
        return;
    }

    if (!response.ok) {
        throw new Error(
            data.message || "Something went wrong"
        );
    }

    return data;
};

export const addTransaction = async transactionData => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        "http://localhost:5000/transactions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(transactionData)
        }
    );

    return handleResponse(response);
};

export const getTransactions = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        "http://localhost:5000/transactions",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return handleResponse(response);
};

export const deleteTransaction = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5000/transactions/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return handleResponse(response);
};

export const getSpendingOverTime = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        "http://localhost:5000/spending-over-time",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return handleResponse(response);
};

export const getBudgets = async (month, year) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5000/budgets?month=${month}&year=${year}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return handleResponse(response);
};

export const updateBudget = async (budgetId, budgetAmount) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5000/budgets/${budgetId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                budget_amount: budgetAmount
            })
        }
    );

    return handleResponse(response);
};

export const createBudget = async (category, budgetAmount, budgetMonth, budgetYear ) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        "http://localhost:5000/budgets",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                category,
                budget_amount: budgetAmount,
                budget_month: budgetMonth,
                budget_year: budgetYear
            })
        }
    );

    return handleResponse(response);
};

/* report page code */

export const getReportSummary = async (month, year) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5000/report-summary?month=${month}&year=${year}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return handleResponse(response);
};

export const getIncomeVsExpenseChart = async year => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5000/report-income-expense?year=${year}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return handleResponse(response);
};

export const getBudgetVsActual = async (month, year, category) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5000/report-budget-vs-actual?month=${month}&year=${year}&category=${category}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return handleResponse(response);
};

export const getExpenseByCategory = async (month, year) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5000/report-expense-category?month=${month}&year=${year}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return handleResponse(response);
};

export const getCategoryPerformance = async (month, year) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5000/report-category-performance?month=${month}&year=${year}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return handleResponse(response);
};

export const getReportRecentTransactions = async (month, year) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5000/report-recent-transactions?month=${month}&year=${year}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return handleResponse(response);
};

export const getSmartInsights = async (month, year) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `http://localhost:5000/report-smart-insights?month=${month}&year=${year}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return handleResponse(response);
};

/* profile page code */

export const getProfileStats = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        "http://localhost:5000/profile-stats",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return await handleResponse(response);
};

export const loginUser = async (email, password) => {
    const response = await fetch(
        "http://localhost:5000/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    localStorage.setItem("token", data.token);
    return data;
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        "http://localhost:5000/me",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await handleResponse(response);
};

export const updateProfile = async (first_name, last_name) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        "http://localhost:5000/profile",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                first_name,
                last_name
            }),
        }
    );

    return await handleResponse(response);
};