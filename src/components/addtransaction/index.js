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
} from '../../assets'
         
const Addtransactions = () => {
    return (
        <div className="add-transactions">
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

            <div className="add-transactions-content">
                {/*hero section*/}
                <div className="add-transaction-hero">
                    <h1 className="add-transaction-hero-title">Add Transaction</h1>
                </div>
                {/*header section */}
                <div className="add-transaction-header">
                    <p className="add-transaction-header-title">
                        Record a new income or expense transaction
                    </p>
                </div>
                {/*form section*/}
                <div className="add-transaction-form-container">
                    <form className="add-transaction-form">

                        <div className="form-group">
                            <label for="expenseType" className="form-label">Type</label>
                            <select id="expenseType" className="form-select">
                                <option>Income</option>
                                <option>Expense</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="amount" className="form-label">Amount</label>
                            <input type="text" id="amount" className="form-input" placeholder="Amount"/>
                        </div>

                        <div className="form-group">
                            <label for="transferCategory" className="form-label">Category</label>
                            <select id="transferCategory" className="form-select">
                                <option>Entertainment</option>
                                <option>Salary</option>
                                <option>Bills</option>
                                <option>Food</option>
                                <option>Travel</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="transferDate" className="form-label">Date</label>
                            <input type="date" id="transferDate" className="form-input"/>
                        </div>

                        <div className="form-group">
                            <label for="transferPaymentType" className="form-label">Payment Method</label>
                            <select id="transferPaymentType" className="form-select">
                                <option>Credit Card</option>
                                <option>Bank Transfer</option>
                                <option>UPI</option>
                                <option>Cash</option>
                                <option>Debit Card</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary">Cancel</button>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Addtransactions;