 import { useEffect, useState } from "react";

import { Radar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from "chart.js";

import {
    getExpenseByCategory
} from "../../../services/transactionApi";

import {
    getExpenseByCategoryChartConfig
} from "./chartConfig";

import "./index.css";


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);


const ExpenseByCategory = ({
    selectedMonth,
    selectedYear
}) => {

    const [expenseData, setExpenseData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);


    useEffect(() => {

        const fetchExpenseData = async () => {

            try {
                setLoading(true);
                setError(false);

                const data =
                    await getExpenseByCategory(
                        selectedMonth,
                        selectedYear
                    );

                setExpenseData(data);

            } catch (error) {
                console.log(error);
                setError(true);
                setExpenseData([]);

            } finally {

                setLoading(false);

            }

        };

        fetchExpenseData();

    }, [
        selectedMonth,
        selectedYear
    ]);


    const totalExpense = expenseData.reduce(
        (total, item) =>
            total + Number(item.expense),

        0
    );


    return (

        <div className="expense-by-category">

            <div className="expense-by-category-chart">

                {loading ? (

                    <p className="expense-category-message">
                        Loading Data...
                    </p>

                )  : error ? (
                    <p className="expense-category-message">
                        Unable to load expense data.
                        Please try again later.
                    </p>
                ) : totalExpense === 0 ? (

                    <p className="expense-category-message">
                        No Expense Data...
                    </p>

                ) : (

                <Radar
                    data={getExpenseByCategoryChartConfig(expenseData)}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,

                        scales: {
                            r: {
                                beginAtZero: true,

                                grid: {
                                    display: true
                                },

                                angleLines: {
                                    display: false
                                },

                                ticks: {
                                    stepSize: 1500,
                                    backdropColor: "transparent",

                                    callback: (value) =>
                                        `₹${Number(value).toLocaleString()}`
                                },

                                pointLabels: {
                                    font: {
                                        size: 14
                                    }
                                }
                            }
                        },

                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }}
                />

                )}

            </div>

        </div>

    );

};


export default ExpenseByCategory;