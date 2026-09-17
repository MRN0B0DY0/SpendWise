import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/authentication/ProtectedRoute';
import Welcome from './components/authentication/welcome';
import Homepage from './components/homepage'
import Transactions from './components/transactions'
import Addtransactions from './components/addtransaction'
import Budgetplanner from './components/budgetplanner'
import Report from './components/reports'
import Profile from './components/profile'

import './App.css';

const App = () => (
  <Router>
        <div className="App">
            <Routes>

                {/* Public Route */}
                <Route path="/" element={<Welcome />} />

                {/* Protected Routes */}
                <Route path="/homepage" element={
                        <ProtectedRoute> 
                            <Homepage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/transactions" element={
                        <ProtectedRoute>
                            <Transactions />
                        </ProtectedRoute>
                    }
                />

                <Route path="/add-transaction" element={
                        <ProtectedRoute>
                            <Addtransactions />
                        </ProtectedRoute>
                    }
                />

                <Route path="/budget-planner" element={
                        <ProtectedRoute>
                            <Budgetplanner />
                        </ProtectedRoute>
                    }
                />

                <Route path="/reports" element={
                        <ProtectedRoute>
                            <Report />
                        </ProtectedRoute>
                    }
                />

                <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </div>

    </Router>

)

export default App;
