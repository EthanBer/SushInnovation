import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all required fields');
            return;
        }

        // Your authentication logic here
        navigate('/');
    };

    return (
        <div className="signin-container">
            <h1 className="signin-title">Welcome Back</h1>
            <form className="signin-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="signin-input"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="signin-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="signin-input"
                    placeholder="Username (if signing up)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {error && <div className="signin-error">{error}</div>}
                <button type="submit" className="signin-button">
                    {username ? 'Sign Up' : 'Sign In'}
                </button>
            </form>
            <Link to="/forgot-password" className="forgot-password-link">
                Forgot your password?
            </Link>
        </div>
    );
};

export default SignIn;