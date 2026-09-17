import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/transactionApi";
import './index.css'

const Welcome = () => {
    const navigate = useNavigate();
    const [displayWelcome, setDisplayWelcome] = useState(true);
    const [DisplayDemoAccount, setDisplayDemoAccount] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    //For demo purpose only
    const handleDemoLogin = async (demoEmail, demoPassword) => {
        setEmail(demoEmail);
        setPassword(demoPassword);

        try {
            await loginUser(demoEmail, demoPassword);
            navigate("/homepage");
        } catch (error) {
            setLoginError(error.message);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await loginUser(email, password);
            navigate("/homepage");
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <div className='welcome-page'>
            {displayWelcome ? 
                <div className='welcome-page-card'>
                    <div className='welcome-page-brand'>
                        <h1>SpendWise</h1>
                        <p>Finance Tracker</p>
                    </div>
                    <div className='welcome-page-heading'>
                        <p>Take control of your<br/>finances</p>
                    </div>
                    <div className='welcome-page-description'>
                        <p>Track your income, expenses, and<br/>budgets all in one place.</p>
                    </div>
                    <div className='welcome-page-actions'>
                        <button onClick={() => setDisplayWelcome(false)}>Login</button>
                        <button disabled>Create New</button>
                    </div>
                    <div className='welcome-page-tagline'>
                        <p>Simple • Smart • SpendWise</p>
                    </div>
                </div> :
                <div className='login-page-card'>
                    <div className='login-page-brand'>
                        <h1>SpendWise</h1>
                        <p>Finance Tracker</p>
                    </div>

                    <div className='login-page-heading'>
                        <p>Welcome Back</p>
                    </div>
                    
                    <form className='login-page-form' onSubmit={handleLogin}>
                        <div className='login-page-form-email'>
                            <label>Email</label>
                            <input 
                                type='email' 
                                placeholder='Email' 
                                value={email}
                                onChange={(event) => setEmail(event.target.value)} 
                                onFocus={() => setLoginError("")}
                            />
                        </div>

                        <div className='login-page-form-password'>
                            <label>Password</label>
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onFocus={() => setLoginError("")}
                            />
                        </div>

                        <div className="login-page-form-error-msg">
                            {loginError && ( <p>{loginError}</p> )}
                        </div>

                        {DisplayDemoAccount ? 
                            <div className='login-page-form-button'>
                                <button type='submit'>Login</button>
                                <button type='button' onClick={() => setDisplayWelcome(true)}>Back</button>
                                <button type='button' onClick={() => setDisplayDemoAccount(false)}>Demo</button>
                            </div> :
                            <div className='login-page-form-button'>
                                <button type='button' onClick={() => handleDemoLogin("omar@spendwise.com", "Test@123")}>Account 1</button>
                                <button type='button' onClick={() => setDisplayDemoAccount(true)}>Back</button>
                                <button type='button' onClick={() => handleDemoLogin("test@spendwise.com", "Omar@123")}>Account 2</button>
                            </div>
                        }

                        
                    </form>
                    
                </div>
            }
        </div>
    )
}

export default Welcome;