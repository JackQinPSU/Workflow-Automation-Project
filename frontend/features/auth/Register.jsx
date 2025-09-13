import { useState } from 'react';
import { register } from './authService';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: ""});
    const [error, setError] = useState("");


const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = await register(formData); //backend will handle the response
    } catch (err) {
        setError(err.response?.data?.error || 'Registration failed');
    }
};

return (
    <div className="register-container">
        <div className="register-card">
            <h2 className="register-title">Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className='register-form'>
                <input 
                    className="register-input"
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    className="register-input"
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    className="register-input"
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <button className="register-button"type="submit">Register</button>

                <button className="secondary-button"type="button" onClick={() => window.location.href = '/login'}>
                    Have an account? Login!
                </button>
            </form>
        </div>
    </div>
);
}

export default Register;