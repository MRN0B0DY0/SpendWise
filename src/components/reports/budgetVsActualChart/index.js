import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { getBudgetVsActual } from "../../../services/transactionApi";
import { getBudgetVsActualChartConfig } from "./chartConfig";

import "./index.css";


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const BudgetVsActual = ({selectedMonth, selectedYear }) => {
    const [selectedCategory, setSelectedCategory] = useState("Food");
    const [budgetData, setBudgetData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const categories = [
        "Food",
        "Bills",
        "Entertainment",
        "Travel"
    ];

    useEffect(() => {
        const fetchBudgetData = async () => {
            try {
                setLoading(true);
                setError(false);
                setBudgetData(null);
                const data =
                    await getBudgetVsActual(
                        selectedMonth,
                        selectedYear,
                        selectedCategory
                    );
                setBudgetData(data);
            } catch (error) {
                setError(true);
                setBudgetData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchBudgetData();
    }, [
        selectedMonth,
        selectedYear,
        selectedCategory
    ]);

    return (
        <div className="budget-vs-actual">
            <div className="budget-vs-actual-header">
                <select
                    value={selectedCategory}
                    onChange={(event) =>
                        setSelectedCategory(
                            event.target.value
                        )
                    }
                >
                    {categories.map(category => (
                        <option
                            key={category}
                            value={category}
                        >
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="budget-vs-actual-chart">
                {loading && (
                    <p className="budget-vs-actual-message">
                        Loading budget data...
                    </p>
                )}

                {!loading && error && (
                    <p className="budget-vs-actual-message">
                        Unable to load budget data.<br/>
                        Please try again later.
                    </p>
                )}

                {!loading && !error && !budgetData && (
                    <p className="budget-vs-actual-message">
                        No budget data available for{" "}
                        {selectedCategory}.
                    </p>
                )}

                {!loading && !error && budgetData && (
                    <Doughnut
                        data={
                            getBudgetVsActualChartConfig(
                                budgetData
                            )
                        }
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: "bottom"
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            const value =
                                                context.raw || 0;
                                            return ` ₹${Number(value).toLocaleString()}`;
                                        }
                                    }
                                }
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
};


export default BudgetVsActual;