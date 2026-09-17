export const getExpenseByCategoryChartConfig = (
    expenseData
) => {
    const categories = expenseData.map(
        item => item.category
    );
    const expenses = expenseData.map(
        item => Number(item.expense)
    );
    return {
        labels: categories,
        datasets: [
            {
                label: "Expense",
                data: expenses,
                backgroundColor:
                    "rgba(99, 102, 241, 0.20)",
                borderColor:
                    "#6366f1",
                borderWidth: 2,
                pointBackgroundColor:
                    "#6366f1",
                pointBorderColor:
                    "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }
        ]
    };
};