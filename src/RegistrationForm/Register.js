import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate(); // Use the useNavigate hook
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            alert('User registered Successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form style={{marginLeft: '20px'}} onSubmit={handleSubmit}>
            <h1>Register Form</h1>
            <input type="text" label={'User Name'} placeholder="User name" onChange={(e) => setUsername(e.target.value)} required /> <br/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required /><br />
            <button type="submit">Register</button>
            <h3>If you have already registered click on the login button to see the autction details</h3>
            <button type='button' onClick={() => navigate('/login') }>Login</button>
        </form>
    );

}

export default Register;