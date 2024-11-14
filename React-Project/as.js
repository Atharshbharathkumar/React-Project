import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [loggedIn, setLoggedIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');


    const handleLogin = (e) => {
        e.preventDefault();
        setLoggedIn(true);
        setCurrentPage('dashboard');
    };
    
    


    const fetchTransactionHistory = async () => {
        try {
            const response = await axios.get(`${API_URL}/transactions`);
            setTransactionHistory(response.data.transactions);
        } catch (error) {
            console.error('Error fetching transaction history:', error);
        }
    };

    const handleDeposit = async () => {
        const depositAmount = parseFloat(amount);
        if (isNaN(depositAmount) || depositAmount <= 0) {
            alert('Please enter a valid deposit amount.');
            return;
        }

        setBalance(prevBalance => prevBalance + depositAmount);
        setTransactionHistory(prevHistory => [
            ...prevHistory,
            `Deposited: $${depositAmount.toFixed(2)}`
        ]);
        setAmount('');

        try {
            await axios.post(`${API_URL}/deposit`, { amount: depositAmount });
            fetchTransactionHistory();
        } catch (error) {
            console.error('Error processing deposit:', error);
        }
    };

    const handleWithdraw = async () => {
        const withdrawAmount = parseFloat(amount);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            alert('Please enter a valid withdrawal amount.');
            return;
        }

        if (withdrawAmount > balance) {
            alert('Insufficient funds.');
            return;
        }

        setBalance(prevBalance => prevBalance - withdrawAmount);
        setTransactionHistory(prevHistory => [
            ...prevHistory,
            `Withdrew: $${withdrawAmount.toFixed(2)}`
        ]);
        setAmount('');

        try {
            await axios.post(`${API_URL}/withdraw`, { amount: withdrawAmount });
            fetchTransactionHistory();
        } catch (error) {
            console.error('Error processing withdrawal:', error);
        }
    };

    const handleClearHistory = () => {
        setTransactionHistory([]);
    };

    useEffect(() => {
        if (loggedIn) {
            fetchTransactionHistory();
        }
    }, [loggedIn]);

    return (
        <div style={styles.container}>
            {currentPage === 'home' && <button onClick={() => setCurrentPage('login')}>Login</button>}
            {currentPage === 'login' && (
                <form onSubmit={handleLogin} style={styles.form}>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Login</button>
                    {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                </form>
            )}
            {currentPage === 'dashboard' && loggedIn && (
                <div style={styles.balanceContainer}>
                    <h2>Current Balance: ${balance.toFixed(2)}</h2>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        style={styles.input}
                    />
                    <button onClick={handleDeposit} style={styles.button}>Deposit</button>
                    <button onClick={handleWithdraw} style={styles.button}>Withdraw</button>

                    <div style={styles.historyContainer}>
                        <h4>Transaction History</h4>
                        {transactionHistory.length === 0 ? (
                            <p>No transactions yet.</p>
                        ) : (
                            <ul>
                                {transactionHistory.map((transaction, index) => (
                                    <li key={index}>{transaction}</li>
                                ))}
                            </ul>
                        )}
                        <button onClick={handleClearHistory} style={styles.clearButton}>
                            Clear History
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
        height: '100vh',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        padding: '10px',
        margin: '10px 0',
        width: '100%',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        margin: '5px',
        width: '100px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    balanceContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    historyContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    clearButton: {
        padding: '10px',
        marginTop: '10px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    }
};

export default App;
