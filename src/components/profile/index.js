import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";
import {
    getProfileStats,
    getCurrentUser,
    updateProfile
} from "../../services/transactionApi";
import {    
    addtransactionicon,
    budgetplannericon,
    dashboardicon,
    profileicon,
    reportsicon,
    transactionsicon,
    logo,
} from '../../assets'
         
const Profile = () => {
    const [profileStats, setProfileStats] = useState(null);
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleUpdateProfile = async () => {
        try {
            await updateProfile(firstName, lastName);
            setUser({
                ...user,
                first_name: firstName,
                last_name: lastName
            });
            alert("Profile Updated Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userData = await getCurrentUser();
                const statsData = await getProfileStats();
                setUser(userData);
                setProfileStats(statsData);
                setFirstName(userData.first_name);
                setLastName(userData.last_name);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProfileData();
    }, []);

    return (
        <div className="profile">
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
            </div>

            <div className="profile-content">
                <div className="profile-hero">
                    <h1 className="profile-title">My Profile</h1>
                    <p className="profile-subtitle">Manage your account information</p>
                </div>

                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-image-container">
                            <img
                                src={profileicon}
                                alt="Profile"
                                className="profile-image"
                            />
                        </div>

                        <h2 className="profile-name">    
                            {user 
                            ? `${user.first_name} ${user.last_name}`
                            : "Loading..."}
                        </h2>

                        <p className="profile-email">
                            {user ? user.email : "Loading..."}
                        </p>
                    </div>

                    <div className="profile-form">
                        <div className="profile-input-row">
                            <div className="profile-input-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                />
                            </div>

                            <div className="profile-input-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                />
                            </div>

                            <div className="profile-input-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={user ? user.email : ""}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="profile-stats">
                        <div className="profile-stat-card">
                            <h3>Total Income</h3>
                            <h2>    
                                {profileStats
                                    ? `₹${profileStats.totalIncome.toLocaleString()}`
                                    : "₹0"
                                }
                            </h2>
                        </div>

                        <div className="profile-stat-card">
                            <h3>Total Expense</h3>
                            <h2>
                                {profileStats
                                    ? `₹${profileStats.totalExpense.toLocaleString()}`
                                    : "₹0"
                                }
                            </h2>
                        </div>

                        <div className="profile-stat-card">
                            <h3>Total Savings</h3>
                            <h2>
                                {profileStats
                                    ? `₹${profileStats.savings.toLocaleString()}`
                                    : "₹0"
                                }
                            </h2>
                        </div>

                        <div className="profile-stat-card">
                            <h3>Total Transactions</h3>
                            <h2>
                                {profileStats
                                    ? profileStats.transactionCount.toLocaleString()
                                    : "0"
                                }
                            </h2>
                        </div>
                    </div>

                    <div className="profile-update-btn-container">
                        <button className="profile-update-btn" onClick={handleUpdateProfile}>
                            Update Profile
                        </button>

                        <button className="profile-update-btn" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;