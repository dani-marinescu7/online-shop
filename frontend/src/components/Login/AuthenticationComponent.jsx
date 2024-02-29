import React, { useState } from 'react';
import axios from 'axios';

const AuthenticationComponent = () => {
    const [registerRequest, setRegisterRequest] = useState({});
    const [loginRequest, setLoginRequest] = useState({});

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8080/register', registerRequest);
            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/login', loginRequest);
            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <h1>Authentication</h1>

            <div>
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setRegisterRequest({ ...registerRequest, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setRegisterRequest({ ...registerRequest, password: e.target.value })}
                />
                <button onClick={handleRegister}>Register</button>
            </div>

            <div>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setLoginRequest({ ...loginRequest, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default AuthenticationComponent;