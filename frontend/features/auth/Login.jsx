import React, { useState } from 'react';
import { login } from './authService';
import './Login.css'; 

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await login(formData);
            onLogin(); // inform parent that user is logged in
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
    }
};

return (
    <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="username" 
                placeholder="Username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
                disabled={isLoading}
            />
            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    </div>
);
}

export default Login;