import React, { useState } from 'react';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [transactionHistory, setTransactionHistory] = useState([]);


    const [feedbackData, setFeedbackData] = useState({ feedback: '' });
    

    const [chatbotVisible, setChatbotVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Feedback input handling
    const handleFeedbackChange = (e) => {
        const { value } = e.target;
        setFeedbackData({ ...feedbackData, feedback: value });
    };

    // Login functionality
    const handleLogin = (e) => {
        e.preventDefault();
        if (formData.username === 'user' && formData.password === 'password') {
            setLoggedIn(true);
            setCurrentPage('dashboard');
            setErrorMessage(''); 
        } else {
            setLoggedIn(true); 
        }
    };
    

    // Sign-in functionality
    const handleSignIn = (e) => {
        e.preventDefault();
        console.log('Sign In:', formData);
        setCurrentPage('login');
    };

    // Deposit functionality
    const handleDeposit = () => {
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
    };

    // Withdraw functionality
    const handleWithdraw = () => {
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
    };

    const handleClearHistory = () => {
        setTransactionHistory([]);
    };

    // Chatbot functionality
    const toggleChatbot = () => {
        setChatbotVisible(!chatbotVisible);
    };

    const sendMessage = () => {
        if (userInput.trim() === '') return;


        setMessages(prevMessages => [...prevMessages, { text: `You: ${userInput}`, sender: 'user' }]);

    
        setMessages(prevMessages => [
            ...prevMessages,
            { text: 'Bot: I am a chatbot. How can I help you?', sender: 'bot' }
        ]);

        setUserInput(''); 
    };

 
    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback submitted:', feedbackData);
        alert('Thank you for your feedback!');
        setFeedbackData({ feedback: '' }); 
        setCurrentPage('home'); 
    };

    return (
        <div style={styles.body}>
            <div style={styles.header}>
                <h1 style={{ color: 'white' }}>Bank Management System</h1>
                <button style={styles.navButton} onClick={() => setCurrentPage('home')}>Home</button>
                <button style={styles.navButton} onClick={() => setCurrentPage('login')}>Login</button>
                <button style={styles.navButton} onClick={() => setCurrentPage('signin')}>SignIn</button>
                {loggedIn && (
                    <>
                        <button style={styles.navButton} onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
                        <button style={styles.navButton} onClick={() => setCurrentPage('profile')}>Profile</button>
                        <button style={styles.navButton} onClick={() => setCurrentPage('feedback')}>Feedback</button>
                    </>
                )}
            </div>

            <div style={styles.interactiveContainer}>
                <div style={styles.formContainer}>
                    {currentPage === 'home' && (
                        <div>
                            <h2>Welcome to Our Bank</h2>
                            <p>Manage your finances with ease.</p>
                            <button style={styles.formButton} onClick={() => setCurrentPage('login')}>Get Started</button>
                        </div>
                    )}

                    {currentPage === 'login' && (
                        <div>
                            <h2>Login</h2>
                            <form onSubmit={handleLogin}>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    required
                                />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    required
                                />
                                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                <button type="submit" style={styles.formButton}>Login</button>
                            </form>
                            <p>
                                Don't have an account?{' '}
                                <button style={styles.toggleButton} onClick={() => setCurrentPage('signin')}>Sign In</button>
                            </p>
                        </div>
                    )}

                    {currentPage === 'signin' && (
                        <div>
                            <h2>Sign In</h2>
                            <form onSubmit={handleSignIn}>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    required
                                />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    required
                                />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    required
                                />
                                <button type="submit" style={styles.formButton}>Sign In</button>
                            </form>
                            <p>
                                Already have an account?{' '}
                                <button style={styles.toggleButton} onClick={() => setCurrentPage('login')}>Login</button>
                            </p>
                        </div>
                    )}

                    {currentPage === 'profile' && loggedIn && (
                        <div>
                            <h2>User Profile</h2>
                            <p><strong>Username:</strong> {formData.username}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                        </div>
                    )}

                    {currentPage === 'dashboard' && loggedIn && (
                        <div>
                            <h2>Dashboard</h2>
                            <div style={styles.balanceContainer}>
                                <h3>Current Balance: ${balance.toFixed(2)}</h3>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    style={styles.input}
                                />
                                <button onClick={handleDeposit} style={styles.formButton}>Deposit</button>
                                <button onClick={handleWithdraw} style={styles.formButton}>Withdraw</button>
                            </div>
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
                                <button onClick={handleClearHistory} style={styles.clearButton}>Clear History</button>
                            </div>
                            <button style={styles.formButton} onClick={() => {
                                setLoggedIn(false);
                                setCurrentPage('home');
                            }}>Log Out</button>
                        </div>
                    )}

                    {currentPage === 'feedback' && (
                        <div>
                            <h2>Feedback</h2>
                            <form onSubmit={handleFeedbackSubmit}>
                                <textarea
                                    placeholder="Your feedback"
                                    value={feedbackData.feedback}
                                    onChange={handleFeedbackChange}
                                    style={styles.feedbackInput}
                                    required
                                />
                                <button type="submit" style={styles.formButton}>Submit Feedback</button>
                            </form>
                        </div>
                    )}
                </div>

                {chatbotVisible && (
                    <div style={styles.chatbotContainer}>
                        <h2>Chatbot</h2>
                        <div style={styles.messagesContainer}>
                            {messages.map((msg, index) => (
                                <p key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>{msg.text}</p>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            style={styles.input}
                            placeholder="Type a message"
                        />
                        <button onClick={sendMessage} style={styles.formButton}>Send</button>
                    </div>
                )}

                <button onClick={toggleChatbot} style={styles.chatbotToggle}>
                    {chatbotVisible ? 'Hide Chatbot' : 'Show Chatbot'}
                </button>
            </div>
        </div>
    );
};

const styles = {
    body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        padding: '20px',
    },
    header: {
        width: '100%',
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navButton: {
        backgroundColor: '#0056b3',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
    },
    interactiveContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '800px',
        marginTop: '20px',
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    formButton: {
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    toggleButton: {
        background: 'none',
        border: 'none',
        color: '#007BFF',
        cursor: 'pointer',
    },
    balanceContainer: {
        marginBottom: '20px',
    },
    historyContainer: {
        marginTop: '20px',
    },
    clearButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    feedbackInput: {
        width: '100%',
        height: '100px',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    chatbotContainer: {
        width: '300px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #ced4da',
        borderRadius: '5px',
        padding: '10px',
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    messagesContainer: {
        maxHeight: '200px',
        overflowY: 'auto',
        marginBottom: '10px',
    },
    chatbotToggle: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    },
};

export default App;
