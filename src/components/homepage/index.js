import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getTransactions, getSpendingOverTime } from "../../services/transactionApi";
import './index.css'
import {    
    addtransactionicon,
    budgetplannericon,
    dashboardicon,
    profileicon,
    reportsicon,
    transactionsicon,
    logo,
} from '../../assets'

const Homepage = () => {
    const [transactions, setTransactions] = useState([]);
    const [monthlyExpense, setMonthlyExpense] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const [transactionsData, monthlyData] = await Promise.all([
                    getTransactions(),
                    getSpendingOverTime()
                ]);

                setTransactions(transactionsData);
                setMonthlyExpense(monthlyData);

            } catch (error) {

                console.log(error);

            }

        };

        fetchData();

    }, []);

    const totalIncome = transactions.reduce(
        (sum, transaction) =>
            transaction.type === "Income"
                ? sum + Number(transaction.amount)
                : sum,0
    );

    const totalExpense = transactions.reduce(
        (sum, transaction) =>
            transaction.type === "Expense"
                ? sum + Number(transaction.amount)
                : sum, 0
    );

    const categoryTotals = {};
    transactions.forEach(transaction => {
        if (transaction.type === "Expense") {
            categoryTotals[transaction.category] =
                (categoryTotals[transaction.category] || 0)
                + Number(transaction.amount);
        }

    });

    const paymentMethods = {};
    transactions.forEach(transaction => {
        paymentMethods[transaction.payment_method] =
            (paymentMethods[transaction.payment_method] || 0) + 1;
    });

    const paymentMethodData = Object.entries(paymentMethods);

    const maxPaymentCount = Math.max(
        ...paymentMethodData.map(method => method[1]),
        1
    );

    const maxExpense = Math.max(
        ...monthlyExpense.map(item => Number(item.total_expense || 0)),
        1
    );

    const spendingBreakdown = {};
    transactions.forEach(transaction => {
        if (transaction.type === "Expense") {
            spendingBreakdown[transaction.category] =
                (spendingBreakdown[transaction.category] || 0)
                + Number(transaction.amount);
        }
    });

    const spendingData = Object.entries(spendingBreakdown);
    const maxCategoryExpense = Math.max(
        ...spendingData.map(category => category[1]),
        1
    );

   
    const topCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const recentTransactions = transactions.slice(0, 5);
    const totalBalance = totalIncome - totalExpense;
    const savings = totalBalance;

    return (
        <div className='homepage'>
            <div className="nav-menu">
                <div className="nav-brand">
                    <div>
                        <img src={logo} alt="Logo" className="nav-logo"/>
                    </div>
                    <div className="nav-brand-name">
                        <h1 className="nav-title">SpendWise</h1>
                        <p className="nav-subtitle">Finance Tracker</p>
                    </div>
                </div>
                <div>
                    <ul className="nav-links-list">
                        <li className="nav-item">
                            <Link to="/" className="link-container">
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
            </div>

            <div className="dashboard">
                <div className="dashboard-hero">
                    <h1 className="dashboard-title">SpendWise Finance Dashboard</h1>
                    <p className="dashboard-subtitle">Track your financial activity efficiently.</p>
                </div>
            
                <div className="dashboard-summary">
                    <div className="dashboard-summary-card">
                        <h2 className="dashboard-summary-title">Total Balance</h2>
                        <p className="dashboard-summary-value">₹{totalBalance.toLocaleString()}</p>
                    </div>
                    <div className="dashboard-summary-card">
                        <h2 className="dashboard-summary-title">Total Income</h2>
                        <p className="dashboard-summary-value">₹{totalIncome.toLocaleString()}</p>
                    </div>
                    <div className="dashboard-summary-card">
                        <h2 className="dashboard-summary-title">Total Expenses</h2>
                        <p className="dashboard-summary-value">₹{totalExpense.toLocaleString()}</p>
                    </div>
                    <div className="dashboard-summary-card">
                        <h2 className="dashboard-summary-title">Savings</h2>
                        <p className="dashboard-summary-value">₹{savings.toLocaleString()}</p>
                    </div>
                </div>
            
                <div className="dashboard-widgets">
                    <div className="dashboard-widget-card dashboard-widget-chart">
                        <h2 className="dashboard-widget-title">Spending Over Time</h2>
                       <div className="monthly-chart">
                            {
                                monthlyExpense.map(item => (
                                    <div
                                        key={item.month}
                                        className="monthly-bar-container"
                                    >
                                        <p className="monthly-value">
                                            ₹{item.total_expense || 0}
                                        </p>
                                        <div
                                            className="monthly-bar"
                                            style={{
                                                height:
                                                    `${Number(item.total_expense) / maxExpense * 160}px`
                                            }}
                                        ></div>
                                        <p className="monthly-name">
                                            {item.month}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="dashboard-widget-card dashboard-widget-categories">
                        <h2 className="dashboard-widget-title">Top Spending Categories</h2>
                        <div className="dashboard-widget-card-text-container">
                            {
                                topCategories.map(category => (
                                    <p key={category[0]} className="dashboard-widget-text">
                                        {category[0]} : ₹{category[1].toLocaleString()}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="dashboard-widget-card dashboard-widget-transactions">
                        <h2 className="dashboard-widget-title">Recent Transactions</h2>
                        <div className="dashboard-widget-card-text-container">
                            {
                                recentTransactions.map(transaction => (
                                    <p
                                        key={transaction.id}
                                        className="dashboard-widget-text"
                                    >
                                        {transaction.transaction_name}
                                        {" : "}
                                        ₹{transaction.amount.split(".")[0]}
                                    </p>
                                ))
                            }
                        </div>

                    </div>
                </div>
            
                <div className="dashboard-details">
                    <div className="dashboard-detail-card dashboard-detail-spending">
                        <h2 className="dashboard-detail-title">Spending Breakdown</h2>
                        <div className="category-breakdown">
                            {
                                spendingData.map(category => (
                                    <div
                                        key={category[0]}
                                        className="category-item"
                                    >
                                        <div className="dashboard-detail-text">
                                            <span>
                                                {category[0]}
                                            </span>

                                        </div>
                                        <div className="category-bar-background">
                                            <div
                                                className="category-bar-fill"
                                                style={{
                                                    width:
                                                        `${(category[1] / maxCategoryExpense) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="dashboard-detail-card">
                        <h2 className="dashboard-detail-title">Payment Methods Analysis</h2>
                        <div className="payment-chart">
                            {paymentMethodData.map(method => (
                                <div
                                    key={method[0]}
                                    className="payment-bar-item"
                                >
                                    <div className="dashboard-detail-text">
                                        <span>{method[0]}</span>
                                    </div>
                                    <div className="payment-bar-background">
                                        <div
                                            className="payment-bar-fill"
                                            style={{
                                                width: `${(method[1] / maxPaymentCount) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
};

export default Homepage;