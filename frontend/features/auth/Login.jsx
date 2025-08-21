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
        } catch (err) {
            setError(err.response?.data?.errer || 'Login failed');
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

            />
            <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange} 
                required 

            />
            <button type="submit">
                Login
            </button>
        </form>
    </div>
);
}

export default Login;