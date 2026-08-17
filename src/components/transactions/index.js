import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "../../services/transactionApi";
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
    billicon,
    foodicon,
    travelicon,
    entertainmenticon,
    salaryicon,
    deleteicon,
} from '../../assets'

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filterBy, setFilterBy] = useState("transaction_name");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {

                const data = await getTransactions();

                setTransactions(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchTransactions();

    }, []);

    const handleDelete = async id => {
        try {
            await deleteTransaction(id);

            setTransactions(
                transactions.filter(
                    transaction => transaction.id !== id
                )
            );

            alert("Transaction Deleted");
        }
        catch(error){
            console.log(error);
        }
    };

    const totalTransactions = transactions.length;

    const incomeRecords = transactions.filter(
            transaction => transaction.type === "Income"
        ).length;

    const expenseRecords = transactions.filter(
            transaction => transaction.type === "Expense"
        ).length;

    const totalAmount = transactions.reduce((sum, transaction) => {

        const amount = Number(transaction.amount);

        return transaction.type === "Expense"
            ? sum + amount : sum ;
    }, 0);

    const formatDate = date => {
        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    };

    const filteredTransactions = transactions.filter(
        transaction =>
        String(
            transaction[filterBy]
        )
            .toLowerCase()
            .includes(
                searchInput.toLowerCase()
            )
    );

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
                        <p className="summary-card-value">{totalTransactions}</p>
                    </div>
                    <div className="summary-card">
                        <h3 className="summary-card-title">Income Records</h3>
                        <p className="summary-card-value">{incomeRecords}</p>
                    </div>
                    <div className="summary-card">
                        <h3 className="summary-card-title">Expense Records</h3>
                        <p className="summary-card-value">{expenseRecords}</p>
                    </div>
                    <div className="summary-card">
                        <h3 className="summary-card-title">Total Expense</h3>
                        <p className="summary-card-value">₹{totalAmount.toLocaleString()}</p>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="transactions-controls">
                    <div className="search-box">
                        <img src={searchicon} alt="Search" className="search-icon" />
                        <input type="text" placeholder="Search transactions..." className="search-box-input" value={searchInput} onChange={event =>setSearchInput(event.target.value)} />
                    </div>
                    <div className="filter-options">
                        <select
                        className="filter-options-input"
                            value={filterBy}
                            onChange={event =>
                                setFilterBy(event.target.value)
                            }
                        >
                            <option value="transaction_name">
                                Name
                            </option>

                            <option value="category">
                                Category
                            </option>

                            <option value="type">
                                Type
                            </option>

                            <option value="transaction_date">
                                Date
                            </option>

                            <option value="payment_method">
                                Payment Method
                            </option>
                        </select>
                    </div>
                </div>

                {/* Transaction List */}
                <div className="transactions-list">
                {
                    transactions.length === 0 ? (
                        <p>No Transactions Found</p>
                    ) : (
                        filteredTransactions.map(transaction => (
                            <div
                                className="transaction-card"
                                key={transaction.id}
                            >
                                <img
                                    src={
                                        transaction.type === "Expense"
                                            ? transaction.category === "Food" ? foodicon : transaction.category === "Entertainment" ? entertainmenticon : transaction.category === "Bills" ? billicon : travelicon
                                            : salaryicon
                                    }
                                    alt="Transaction"
                                    className="transaction-card-image"
                                />

                                <div className="transaction-card-info">
                                    <h4 className="transaction-card-title">
                                        {transaction.transaction_name}
                                    </h4>

                                    <p className="transaction-card-meta">
                                        {transaction.category}
                                        {" • "}
                                        {transaction.payment_method}
                                        {" • "}
                                        {formatDate(transaction.transaction_date)}
                                    </p>
                                </div>

                                <p className="transaction-card-type">
                                    {transaction.type}
                                </p>

                                <p className="transaction-card-amount">
                                    ₹{transaction.amount.split(".")[0]}
                                </p>

                                <button
                                    type="button"
                                    className="transaction-card-btn"
                                    onClick={() => handleDelete(transaction.id)}
                                >
                                    <img src={deleteicon} alt="deleteicon" className="delete-icon" />
                                </button>
                            </div>
                        ))
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Transactions;

//<p className="filter-options-text">Filter Options</p>