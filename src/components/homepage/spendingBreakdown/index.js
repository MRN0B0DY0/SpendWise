import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import "./index.css";

const SpendingBreakdown = ({ spendingData }) => {

    const chartData = spendingData.map(category => ({
        category: category[0],
        expense: Number(category[1] || 0)
    }));

    return (
        <div className="spending-breakdown-chart">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{
                        top: 10,
                        right: 20,
                        left: 20,
                        bottom: 10
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        type="number"
                    />

                    <YAxis
                        type="category"
                        dataKey="category"
                        width={100}
                    />

                    <Tooltip
                        formatter={(value) => [
                            `₹${Number(value).toLocaleString()}`,
                            "Expense"
                        ]}
                    />

                    <Bar
                        dataKey="expense"
                        fill="#2563eb"
                        radius={[0, 8, 8, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingBreakdown;