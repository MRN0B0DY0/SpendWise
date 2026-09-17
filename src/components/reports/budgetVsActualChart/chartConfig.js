export const getBudgetVsActualChartConfig = (budgetData) => {
    const spent = Number(budgetData?.spent || 0);
    const remaining = Math.max(
        Number(budgetData?.remaining || 0),
        0
    );

    return {
        labels: [
            "Spent",
            "Remaining"
        ],
        datasets: [
            {
                data: [
                    spent,
                    remaining
                ],

                backgroundColor: [
                    "#ef4444",
                    "#22c55e"
                ],

                borderColor: [
                    "#ef4444",
                    "#22c55e"
                ],

                borderWidth: 0,

                hoverOffset: 8
            }
        ]
    };
};