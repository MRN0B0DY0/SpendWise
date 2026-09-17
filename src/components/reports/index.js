import { Link, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import { getReportSummary } from "../../services/transactionApi";
import IncomeVsExpenseChart from "./incomeVsExpenseChart";
import BudgetVsActualChart from "./budgetVsActualChart";
import ExpenseByCategory from "./expenseByCategoryChart";
import CategoryPerformanceChart from "./categoryPerformanceChart";
import MonthlyTransactions  from "./monthlyTransactions";
import SmartInsights from "./smartInsights";
import "./index.css";
import {    
    addtransactionicon,
    budgetplannericon,
    dashboardicon,
    profileicon,
    reportsicon,
    transactionsicon,
    logo,
    logouticon
} from '../../assets'
         
const Report = () => {
    const [selectedMonth, setSelectedMonth] = useState(6);
    const [selectedYear, setSelectedYear] = useState(2026);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const [summary, setSummary] = useState({
        incomeMonthly: 0,
        expenseMonthly: 0,
        savingMonthly: 0,
        transactionMonthly: 0
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getReportSummary(
                    selectedMonth,
                    selectedYear
                );
                setSummary(data);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchSummary();
    }, [selectedMonth, selectedYear]);

    return (
        <div className="report">
            <div className="nav-menu">
                <div className="nav-brand">
                    <div>
                        <img src={logo} alt="Logo" className="nav-logo" />
                    </div>
                    <div className="nav-brand-name">
                        <h1 className="nav-title">SpendWise</h1>
                        <p className="nav-subtitle">Finance Tracker</p>
                    </div>
                </div>

                <div>
                    <ul className="nav-links-list">
                        <li className="nav-item">
                            <Link to="/homepage" className="link-container">
                                <img src={dashboardicon} alt="Dashboard Icon" className="nav-icon" />
                                <p className="nav-link">Dashboard</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/transactions" className="link-container">
                                <img src={transactionsicon} alt="Transactions Icon" className="nav-icon" />
                                <p className="nav-link">Transactions</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/add-transaction" className="link-container">
                                <img src={addtransactionicon} alt="Add Transaction Icon" className="nav-icon" />
                                <p className="nav-link">Add Transaction</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/budget-planner" className="link-container">
                                <img src={budgetplannericon} alt="Budget Planner Icon" className="nav-icon" />
                                <p className="nav-link">Budget Planner</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/reports" className="link-container">
                                <img src={reportsicon} alt="Reports Icon" className="nav-icon" />
                                <p className="nav-link">Reports</p>
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to="/profile" className="link-container">
                                <img src={profileicon} alt="Profile Icon" className="nav-icon" />
                                <p className="nav-link">Profile</p>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className='nav-logout-btn'>
                    <div className='nav-item' onClick={handleLogout}>
                        <div className='link-container'>
                            <img src={logouticon} alt="Logout Icon" className='nav-icon' />
                            <p className='nav-link'>Logout</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="report-content">

                <div className="report-hero">
                    <h1 className="report-title">Reports & Insights</h1>
                    <p className="report-subtitle">
                        Analyze your financial habits and trends.
                    </p>
                </div>

                <div className="report-filter-card">
                    <select
                        className="report-filter-card-item"
                        value={selectedMonth}
                        onChange={(event)=>
                            setSelectedMonth(Number(event.target.value))
                        }
                    >
                        <option value={1}>January</option>
                        <option value={2}>February</option>
                        <option value={3}>March</option>
                        <option value={4}>April</option>
                        <option value={5}>May</option>
                        <option value={6}>June</option>
                        <option value={7}>July</option>
                        <option value={8}>August</option>
                        <option value={9}>September</option>
                        <option value={10}>October</option>
                        <option value={11}>November</option>
                        <option value={12}>December</option>
                    </select>

                    <select
                        className="report-filter-card-item"
                        value={selectedYear}
                        onChange={(event)=>
                            setSelectedYear(Number(event.target.value))
                        }
                    >
                        <option value={2025}>2025</option>
                        <option value={2026}>2026</option>
                        <option value={2027}>2027</option>
                    </select>
                </div>
            
                <div className="report-summary">

                    <div className="report-summary-card">
                        <h3>Income Monthly</h3>
                        <h2>₹ {summary.incomeMonthly}</h2>
                    </div>

                    <div className="report-summary-card">
                        <h3>Expense Monthly</h3>
                        <h2>₹ {summary.expenseMonthly}</h2>
                    </div>

                    <div className="report-summary-card">
                        <h3>Savings Monthly</h3>
                        <h2>₹ {summary.savingMonthly}</h2>
                    </div>

                    <div className="report-summary-card">
                        <h3>Transactions Monthly</h3>
                        <h2>{summary.transactionMonthly}</h2>
                    </div>

                </div>

                <div className="report-chart-row">
                    <div className="report-chart-card">
                        <h3>Income vs Expense</h3>

                        <p className="report-chart-description">
                            Track your income and expenses throughout the year.
                        </p>

                        <IncomeVsExpenseChart
                            selectedYear={selectedYear}
                        />

                    </div>

                    <div className="report-chart-card">
                        <h3>Budget vs Expense</h3>

                        <p>
                            Compare your spending against your budget for the selected category.
                        </p>

                        <BudgetVsActualChart
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                        />

                    </div>

                </div>

                <div className="report-chart-row report-chart-row-large">
                    <div className="report-category-card">
                        <h3>Expense by Category</h3>

                        <p>
                            See how your spending is distributed
                            across categories.
                        </p>

                        <ExpenseByCategory
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                        />

                    </div>

                    <div className="report-performance-card">
                        <h3>Category Performance</h3>

                        <p>
                            Track how your spending changed
                            across categories.
                        </p>

                        <CategoryPerformanceChart
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                        />

                    </div>
                </div>

                <div className="report-transactions">
                    <h3>Monthly Transactions</h3>

                    <MonthlyTransactions
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                    />

                </div>

                <div className="report-insights">
                    <h3>Smart Insights 💡</h3>

                    <SmartInsights
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                    />

                </div>
            </div>
        </div>
    )
}

export default Report;