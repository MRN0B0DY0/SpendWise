import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./index.css";
import "./chartConfig";
import {
    getIncomeVsExpenseChart
} from "../../../services/transactionApi";

const IncomeVsExpenseChart = ({ selectedYear }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const data =
                    await getIncomeVsExpenseChart(
                        selectedYear
                    );
                setChartData(data);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchChartData();
    }, [selectedYear]);

    const labels = chartData.map(item => item.month);
    const incomeData = chartData.map(item => item.income);
    const expenseData = chartData.map(item => item.expense);
    const data = {
        labels,
        datasets: [
            {
                label: "Income",
                data: incomeData,
                borderColor: "#22c55e",
                backgroundColor: "#22c55e",
                borderWidth: 3,
                tension: 0,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBorderWidth: 2
            },
            {
                label: "Expense",
                data: expenseData,
                borderColor: "#ef4444",
                backgroundColor: "#ef4444",
                borderWidth: 3,
                tension: 0,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBorderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                align:"center",
                labels:{
                    usePointStyle:true,
                    pointStyle:"circle",
                    boxWidth:10,
                    padding:20
                }    
            }
        },
        
        scales: {
            x: {
                grid:{
                    display:false
                }
            },

            y: {
                beginAtZero: true,
                suggestedMax: Math.max(...incomeData, ...expenseData) * 1.1,
                ticks: {
                    stepSize: 20000,
                    callback: value => `₹${value / 1000}K`
                }
            }
        },
    };

    return (
        <div className="income-chart-container">
            <Line
                data={data}
                options={options}
            />
        </div>
    );
};

export default IncomeVsExpenseChart;