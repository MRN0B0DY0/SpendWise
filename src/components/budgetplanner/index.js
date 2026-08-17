import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBudgets, updateBudget, createBudget } from "../../services/transactionApi";
import "./index.css";
import {    
    addtransactionicon,
    budgetplannericon,
    dashboardicon,
    profileicon,
    reportsicon,
    transactionsicon,
    logo,
    rupeeicon,
} from '../../assets'
         
const Budgetplanner = () => {

    const [budgets, setBudgets] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(6);
    const [selectedYear, setSelectedYear] = useState(2026);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const data = await getBudgets(
                    selectedMonth,
                    selectedYear
                );
                setBudgets(data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchBudgets();
    }, [selectedMonth, selectedYear]);

    const handleChange = (category, value) => {
        setBudgets(previousBudgets =>
            previousBudgets.map(budget =>
                budget.category === category
                    ? {
                        ...budget,
                        budget_amount: value === "" ? 0 : Number(value)
                    }
                    : budget
            )
        );
    };

    const handleSave = async () => {
        try {
            await Promise.all(
                budgets.map(budget => {
                    if (budget.budgetExists) {
                        return updateBudget(
                            budget.budget_id,
                            budget.budget_amount
                        );
                    }
                    return createBudget(
                        budget.category,
                        budget.budget_amount,
                        selectedMonth,
                        selectedYear
                    );
                })
            );

            const updatedBudgets =
                await getBudgets(
                    selectedMonth,
                    selectedYear
                );
            setBudgets(updatedBudgets);

            alert("Budget Updated Successfully");

        } catch (error) {
            console.log(error);
        }
    };  

    return (
        <div className="budget-planner">
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
            
            <div className="budget-planner-content">

                <div className="budget-planner-hero">
                    <h1 className="budget-planner-hero-title">Set Budget</h1>
                </div>

                <div className="budget-planner-header">
                    <div>
                        <p className="budget-planner-header-title">Define your budgeting goals</p>
                    </div>
                    <div className="budget-planner-budget-filter">
                        <select
                        className="budget-planner-budget-filter-item"
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
                            className="budget-planner-budget-filter-item"
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
                </div>

                <div className="budget-planner-list">
                    {
                        budgets.map(budget => (
                            <div className="budget-planner-item" key={`${budget.category}-${selectedMonth}-${selectedYear}`}>
                                <div className="budget-planner-item-name-container">
                                    <h3 className="budget-planner-item-name">{budget.category}</h3>
                                </div>

                                <div className="budget-planner-item-details">
                                    <div>
                                        <p>Budget</p>
                                        <div className="budget-planner-input-group">
                                            <img src={rupeeicon} alt="rupee-symbol" className="budget-planner-icon" />
                                            <input type="number"
                                                className="budget-planner-input"
                                                placeholder="Set Budget"
                                                value={budget.budget_amount === 0 ? "" : budget.budget_amount}
                                                onChange={(event)=>
                                                    handleChange(
                                                    budget.category,
                                                    event.target.value
                                                )} 
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <p>Spend</p>
                                        <div className="budget-planner-display-group">
                                            <p className="budget-planner-display-group-text">
                                                ₹ {Number(budget.spent).toLocaleString()}
                                                <br/>
                                                {budget.budget_amount === 0
                                                    ? "Set budget for this month"
                                                    : budget.remaining >= 0
                                                        ? `Remaining ₹ ${budget.remaining}`
                                                        : `Overspent by ₹ ${Math.abs(budget.remaining)}`
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="budget-planner-progress">
                                    <div
                                        className="budget-planner-progress-fill"
                                        style={{
                                            width: `${budget.display_percentage}%`,
                                            backgroundColor:
                                                Number(budget.percentage) > 100
                                                    ? "#ef4444"
                                                    : Number(budget.percentage) > 80
                                                    ? "#f59e0b"
                                                    : "#22c55e"
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="budget-planner-save-btn-container">
                    <button className="budget-planner-save-btn" type="button" onClick={handleSave}>Update Budget</button>
                </div>

            </div>
        </div>
    )
}

export default Budgetplanner;
