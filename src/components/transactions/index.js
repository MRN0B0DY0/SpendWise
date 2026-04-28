import { Link } from "react-router-dom";
import "./index.css";
import {    
    addtransactionicon,
    budgetplannericon,
    dashboardicon,
    profileicon,
    reportsicon,
    transactionsicon,
    logo,
    arrowicon,
    searchicon,
    transactionimage1,
    transactionimage2,
} from '../../assets'
         
const Transactions = () => {
    return (
        <div className="transactions">
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
        <div className="transactions-content">

            {/* Hero banner Section */}
            <div className="transactions-hero">
                <h1 className="transactions-title">Transactions</h1>
                <p className="transactions-subtitle">Manage all your income and expense records</p>
            </div>

            {/* Header Section */}
            <div className="transactions-header">
                <div className="transactions-header-text">
                    <h2 className="transactions-heading">All Transactions</h2>
                    <p className="transactions-description">
                        Track, search, and organize your transaction history
                    </p>
                </div>
                <Link to="/add-transaction" className="transactions-header-action">
                    <img src={addtransactionicon} alt="Add Transaction" className="transactions-add-icon" />
                    <p className="transactions-add-btn">Add Transaction</p>
                    <img src={arrowicon} alt="arrow" className="transactions-arrow-icon" />
                </Link>
            </div>

            {/* Summart Section */}
            <div className="transactions-summary">
                <div className="summary-card">
                    <h3 className="summary-card-title">Total Transactions</h3>
                    <p className="summary-card-value">128</p>
                </div>
                <div className="summary-card">
                    <h3 className="summary-card-title">Income Records</h3>
                    <p className="summary-card-value">42</p>
                </div>
                <div className="summary-card">
                    <h3 className="summary-card-title">Expense Records</h3>
                    <p className="summary-card-value">86</p>
                </div>
                <div className="summary-card">
                    <h3 className="summary-card-title">This Month</h3>
                    <p className="summary-card-value">₹18450</p>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="transactions-controls">
                <div className="search-box">
                    <img src={searchicon} alt="Search" className="search-icon" />
                    <input type="text" placeholder="Search transactions..." className="search-box-input" />
                </div>
                <div className="filter-options">
                    <p className="filter-options-text">Filter Options</p>
                </div>
            </div>

            {/* Transaction List */}
            <div className="transactions-list">
                <div className="transaction-card">
                    <img src={transactionimage1} alt="Transaction-List-Image" className="transaction-card-image" />
                    <div className="transaction-card-info">
                        <h4 className="transaction-card-title">Grocery Shopping</h4>
                        <p className="transaction-card-meta">Entertainment • Credit Card</p>
                    </div>
                    <p className="transaction-card-type">Expense</p>
                    <p className="transaction-card-amount">₹123456</p>
                    <button type="button" className="transaction-card-btn">View Details</button>
                </div>

                <div className="transaction-card">
                    <img src={transactionimage2} alt="Transaction-List-Image" className="transaction-card-image" />
                    <div className="transaction-card-info">
                        <h4 className="transaction-card-title">Grocery Shopping</h4>
                        <p className="transaction-card-meta">Entertainment • Credit Card</p>
                    </div>
                    <p className="transaction-card-type">Expense</p>
                    <p className="transaction-card-amount">₹999</p>
                    <button className="transaction-card-btn">View Details</button>
                </div>

                <div className="transaction-card">
                    <img src={transactionimage1} alt="Transaction-List-Image" className="transaction-card-image" />
                    <div className="transaction-card-info">
                        <h4 className="transaction-card-title">Grocery Shopping</h4>
                        <p className="transaction-card-meta">Entertainment • Credit Card</p>
                    </div>
                    <p className="transaction-card-type">Expense</p>
                    <p className="transaction-card-amount">₹123456</p>
                    <button type="button" className="transaction-card-btn">View Details</button>
                </div>

                <div className="transaction-card">
                    <img src={transactionimage2} alt="Transaction-List-Image" className="transaction-card-image" />
                    <div className="transaction-card-info">
                        <h4 className="transaction-card-title">Grocery Shopping</h4>
                        <p className="transaction-card-meta">Entertainment • Credit Card</p>
                    </div>
                    <p className="transaction-card-type">Expense</p>
                    <p className="transaction-card-amount">₹999</p>
                    <button className="transaction-card-btn">View Details</button>
                </div>

                <div className="transaction-card">
                    <img src={transactionimage2} alt="Transaction-List-Image" className="transaction-card-image" />
                    <div className="transaction-card-info">
                        <h4 className="transaction-card-title">Grocery Shopping</h4>
                        <p className="transaction-card-meta">Entertainment • Credit Card</p>
                    </div>
                    <p className="transaction-card-type">Expense</p>
                    <p className="transaction-card-amount">₹999</p>
                    <button className="transaction-card-btn">View Details</button>
                </div>
                
                <div className="transaction-card">
                    <img src={transactionimage1} alt="Transaction-List-Image" className="transaction-card-image" />
                    <div className="transaction-card-info">
                        <h4 className="transaction-card-title">Grocery Shopping</h4>
                        <p className="transaction-card-meta">Entertainment • Credit Card</p>
                    </div>
                    <p className="transaction-card-type">Expense</p>
                    <p className="transaction-card-amount">₹123456</p>
                    <button type="button" className="transaction-card-btn">View Details</button>
                </div>

                <div className="transaction-card">
                    <img src={transactionimage2} alt="Transaction-List-Image" className="transaction-card-image" />
                    <div className="transaction-card-info">
                        <h4 className="transaction-card-title">Grocery Shopping</h4>
                        <p className="transaction-card-meta">Entertainment • Credit Card</p>
                    </div>
                    <p className="transaction-card-type">Expense</p>
                    <p className="transaction-card-amount">₹999</p>
                    <button className="transaction-card-btn">View Details</button>
                </div>
            </div>

        </div>
        </div>
    )
}

export default Transactions;