import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from './UserProvider';
import axios from 'axios';

import '../css/Header.css';

const Header = () => {
    const navigate = useNavigate();
    const {user, logout} = useContext(UserContext);
    const [notificationCount, setNotificationCount] = useState('0');

    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        setNotificationCount(0);
    };
    useEffect(() => {
        console.log('TEST NotificationCount ::  ', notificationCount)
    }, [notificationCount])

    useEffect(() => {
        console.log('TEST Notification ::  ', notifications)
    }, [notifications])

    useEffect(() => {
        console.log('TEST user Check ::  ', user)
    }, [])

    const checkNotificationList = async () => {
        const url = `http://localhost:8080/api/v1/notification/${user.userId}`;

        const res = await axios.get(url);
        if (res.status === 200) {
            // setNotifications(res.data);
            const sortedNotifications = res.data.sort((a, b) => b.noticeId - a.noticeId);
            const top10Notifications = sortedNotifications.slice(0, 10);
            setNotifications(top10Notifications);

            console.log('TEST Notification List Check ::  ', top10Notifications);

        }
    };

    useEffect(() => {
        if (!user) return;

        const socket = new WebSocket(`ws://localhost:8080/ws/notification/user/${user.userId}`);


        socket.onmessage = (event) => {
            console.log('Received a message from WebSocket:', event.data);
            setNotifications((prev) => [...prev, event.data]);
            setNotificationCount((prevCount) => prevCount + 1);
        };

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onerror = (error) => {
            console.error('There was an error with the WebSocket connection:', error);
        };

        socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
            } else {
                console.error('WebSocket connection died unexpectedly');
            }
        };

        return () => {
            socket.close();
        };
    }, [user]);


    const sessionOut = async () => {
        const res = await axios.post('http://localhost:8080/api/v1/users/logout');
        logout();
        if (res.status !== 200) {
            throw new Error('LogOut Fail!!');
        }
    };



    const handlePageMove = (id) => {
        switch (id) {
            case 'home':
                navigate('/');
                break;
            case 'login':
                navigate('/Login');
                break;
            case 'signUp':
                navigate('/SignUp');
                break;
            case 'myPage':
                navigate('/MyPage');
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <nav className="header-nav">
                <div className="nav-content">
                    <div onClick={() => handlePageMove('home')} className="logo-section">
                        <img src="/image/logo.PNG" className="logo-image" alt="Flowbite Logo"/>
                        <span className="logo-text">헬스짱짱</span>
                    </div>
                    <div className="header-buttons">
                        {user?.name && <p className="welcome-text">Welcome {user.name}</p>}

                        {!user ? (
                            <button onClick={() => handlePageMove('login')} className="head-login-button">
                                Login
                            </button>
                        ) : (
                            <button onClick={sessionOut} className="logout-button">
                                Logout
                            </button>
                        )}
                        <button onClick={() => handlePageMove(user ? 'myPage' : 'signUp')} className="my-page-button">
                            {user ? 'My Page' : 'Sign up'}
                        </button>
                        {user && (
                            <div className="notification-icon" onClick={toggleDropdown}>
                                <img src="/image/—Pngtree—bell vector icon_3791349.png" alt="Notification Icon" onClick={checkNotificationList}/>
                                {notificationCount > 0 &&
                                    <span className="notification-count">{notificationCount}</span>}
                                {showDropdown && (
                                    <div className="notification-dropdown">
                                        {notifications.map((notification, idx) => (
                                            <div
                                                key={idx}
                                                className={`notification-item ${idx < notificationCount ? "unread" : ""}`}
                                            >
                                                {notification.content}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
