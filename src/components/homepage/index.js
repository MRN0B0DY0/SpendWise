import {Link} from 'react-router-dom';
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
                                <a href="/transactions" className="nav-link">Transactions</a>
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
                                <a href="/budget-planner" className="nav-link">Budget Planner</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reports" className="link-container">
                                <img src={reportsicon} alt="Reports Icon" className="nav-icon" />
                                <a href="/reports" className="nav-link">Reports</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="link-container">
                                <img src={profileicon} alt="Profile Icon" className="nav-icon" />
                                <a href="/profile" className="nav-link">Profile</a>
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
                        <p className="dashboard-summary-value">36783</p>
                    </div>
                    <div className="dashboard-summary-card">
                        <h2 className="dashboard-summary-title">Total Income</h2>
                        <p className="dashboard-summary-value">50000</p>
                    </div>
                    <div className="dashboard-summary-card">
                        <h2 className="dashboard-summary-title">Total Expenses</h2>
                        <p className="dashboard-summary-value">13217</p>
                    </div>
                    <div className="dashboard-summary-card">
                        <h2 className="dashboard-summary-title">Savings</h2>
                        <p className="dashboard-summary-value">15000</p>
                    </div>
                </div>
            
                <div className="dashboard-widgets">
                    <div className="dashboard-widget-card dashboard-widget-chart">
                        <h2 className="dashboard-widget-title">Spending Over Time</h2>
                    </div>
                    <div className="dashboard-widget-card dashboard-widget-categories">
                        <h2 className="dashboard-widget-title">Top Spending Categories</h2>
                        <p className="dashboard-widget-text">Category 1: 5000</p>
                        <p className="dashboard-widget-text">Category 2: 3000</p>
                        <p className="dashboard-widget-text">Category 3: 2000</p>
                    </div>
                    <div className="dashboard-widget-card dashboard-widget-transactions">
                        <h2 className="dashboard-widget-title">Recent Transactions</h2>
                        <p className="dashboard-widget-text">Transaction 1: -50</p>
                        <p className="dashboard-widget-text">Transaction 2: -100</p>
                        <p className="dashboard-widget-text">Transaction 3: +2000</p>
                    </div>
                </div>
            
                <div className="dashboard-details">
                    <div className="dashboard-detail-card dashboard-detail-spending">
                        <h2 className="dashboard-detail-title">Spending Breakdown</h2>
                    </div>
                    <div className="dashboard-detail-card">
                        <h2 className="dashboard-detail-title">Payment Methods Analysis</h2>
                        <p className="dashboard-detail-text">Credit Card: 60%</p>
                        <p className="dashboard-detail-text">Debit Card: 30%</p>
                        <p className="dashboard-detail-text">Cash: 10%</p>
                        <p className="dashboard-detail-text">UPI: 10%</p>
                    </div>
                </div>
            </div>
        </div>    
    );
};

export default Homepage;