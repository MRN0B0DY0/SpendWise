import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import "./index.css";

const SpendingOverTimeChart = ({ monthlyExpense }) => {

    const chartData = monthlyExpense.map(item => ({
        month: item.month,
        expense: Number(item.total_expense || 0)
    }));

    return (
        <div className="spending-over-time-chart">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 14,
                        left: 16,
                        bottom: 10
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="month"
                    />

                    <YAxis />

                    <Tooltip
                        formatter={(value) => [
                            `₹${Number(value).toLocaleString()}`,
                            "Expense"
                        ]}
                    />

                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingOverTimeChart;