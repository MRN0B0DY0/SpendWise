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

const PaymentMethodsAnalysis = ({ paymentMethodData }) => {

    const chartData = paymentMethodData.map(method => ({
        method: method[0],
        count: Number(method[1] || 0)
    }));

    return (
        <div className="payment-methods-chart">
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
                        allowDecimals={false}
                    />

                    <YAxis
                        type="category"
                        dataKey="method"
                        width={120}
                    />

                    <Tooltip
                        formatter={(value) => [
                            value,
                            "Transactions"
                        ]}
                    />

                    <Bar
                        dataKey="count"
                        fill="#2563eb"
                        radius={[0, 8, 8, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PaymentMethodsAnalysis;