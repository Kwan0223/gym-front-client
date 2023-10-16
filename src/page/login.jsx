import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserProvider';

const Login = () => {

    const [userInfo, setUserInfo] = useState({
        email: '',
        pwd: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setUserInfo({...userInfo, [event.target.name]: event.target.value});
    };

    const { setUser } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();


            // const res = await axios.post('http://localhost:8080/api/v1/users/login', userInfo, {
            const res = await axios.post('/api/v1/users/login', userInfo, {
                headers : {
                    "Content-Type" : "application/json",
                },
            });

            console.log("TEST RES  data: ", res.data);
            console.log("TEST UserInfo : " , userInfo);
            setUser(res.data);
            navigate('/');



    };


    return (
        <div className="login-container">
            <h2 className="login-heading">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email"> Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={userInfo.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="pwd"
                        name="pwd"
                        className="form-input"
                        value={userInfo.pwd}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="login-button">Log in</button>
            </form>
        </div>
    );
};

export default Login;
