import React, { useState } from 'react';
import { login } from './authService';
import './Login.css'; 

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = await login(formData);
            localStorage.setItem('token', data.token); // Store token in localStorage
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
    }
};

return (
    <div className="login-container">
        <div className="login-card">
            <h2 className="login-title">Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="login-form"onSubmit={handleSubmit}>
                <input 
                    className="login-input"
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 

                />
                <input 
                    className="login-input"
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 

                />
                <button className="login-button" type="submit">
                    Login
                </button>
                <button className="secondary-button" type="button" onClick={() => window.location.href = '/register'}>
                    Register
                </button>
            </form>
        </div>
    </div>
);
}

export default Login;