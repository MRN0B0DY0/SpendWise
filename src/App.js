import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
                <Route path="/" element={<Homepage />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/add-transaction" element={<Addtransactions />} />
                <Route path="/budget-planner" element={<Budgetplanner />} />
                <Route path="/reports" element={<Report />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    </Router>
)
export default App;
