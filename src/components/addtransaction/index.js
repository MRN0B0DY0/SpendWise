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

import { addTransaction } from "../../services/transactionApi";


const Addtransactions = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const transactionData = {
            transaction_name: document.getElementById("name").value,
            amount: document.getElementById("amount").value,
            type: document.getElementById("expenseType").value,
            category: document.getElementById("transferCategory").value,
            transaction_date: document.getElementById("transferDate").value,
            payment_method: document.getElementById("transferPaymentType").value
        };

        try {
            await addTransaction(transactionData);

            alert("Transaction Added Successfully");

                document.getElementById("name").value = "";
                document.getElementById("amount").value = "";
                document.getElementById("expenseType").selectedIndex = 0;
                document.getElementById("transferCategory").selectedIndex = 0;
                document.getElementById("transferDate").value = "";
                document.getElementById("transferPaymentType").selectedIndex = 0;
        }
        catch(error){
            console.error("failed to add transaction:", error);

            alert("failed to add transaction");
        }
    };

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
                    <form className="add-transaction-form" onSubmit={handleSubmit}>

                        <div className="add-transaction-form-group">
                            <label htmlFor="name" className="add-transaction-form-label">Name</label>
                            <input type="text" id="name" className="add-transaction-form-input" placeholder="Name" required/>
                        </div>

                        <div className="add-transaction-form-group">
                            <label htmlFor="amount" className="add-transaction-form-label">Amount</label>
                            <input type="number" id="amount" className="add-transaction-form-input" placeholder="Amount" min="1" required/>
                        </div>

                        <div className="add-transaction-form-group">
                            <label htmlFor="expenseType" className="add-transaction-form-label">Type</label>
                            <select id="expenseType" className="add-transaction-form-select">
                                <option>Income</option>
                                <option>Expense</option>
                            </select>
                        </div>

                        <div className="add-transaction-form-group">
                            <label htmlFor="transferCategory" className="add-transaction-form-label">Category</label>
                            <select id="transferCategory" className="add-transaction-form-select">
                                <option>Salary</option>
                                <option>Entertainment</option>
                                <option>Bills</option>
                                <option>Food</option>
                                <option>Travel</option>
                            </select>
                        </div>

                        <div className="add-transaction-form-group">
                            <label htmlFor="transferDate" className="add-transaction-form-label">Date</label>
                            <input type="date" id="transferDate" className="add-transaction-form-input" required/>
                        </div>

                        <div className="add-transaction-form-group">
                            <label htmlFor="transferPaymentType" className="add-transaction-form-label">Payment Method</label>
                            <select id="transferPaymentType" className="add-transaction-form-select">
                                <option>Credit Card</option>
                                <option>Bank Transfer</option>
                                <option>UPI</option>
                                <option>Cash</option>
                                <option>Debit Card</option>
                            </select>
                        </div>

                        <div className="add-transaction-form-actions">
                            <button
                                type="button"
                                className="add-transaction-btn add-transaction-btn-secondary"
                                onClick={() => {
                                    document.getElementById("name").value = "";
                                    document.getElementById("amount").value = "";
                                    document.getElementById("expenseType").selectedIndex = 0;
                                    document.getElementById("transferCategory").selectedIndex = 0;
                                    document.getElementById("transferDate").value = "";
                                    document.getElementById("transferPaymentType").selectedIndex = 0;
                                }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="add-transaction-btn add-transaction-btn-primary">Submit</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Addtransactions;