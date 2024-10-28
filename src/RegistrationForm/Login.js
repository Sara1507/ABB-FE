import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); // Use the useNavigate hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const token = localStorage.getItem('token')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            alert('Logged in!');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form style={{margin: '20px'}} onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required /><br />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required /><br />
            <button disabled={username == '' || password == ''} type="submit" onClick={() => { (token == '' || token == null || token == undefined) ? setError(true) : navigate('/auction-list')}}>Login</button>
            {error && <p style={{color: 'red'}}>The provided credentials are not correct. Please try with right credentials!</p>}
        </form>
    );
};

export default Login;