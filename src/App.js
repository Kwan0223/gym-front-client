import './css/App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Detail from "./page/Detail";
import Header from "./components/header";
import Footer from "./components/footer";
import Content from "./layout/content";
import Login from "./page/login";
import SignUp from "./page/SignUp";
import MyPage from "./page/MyPage"; // 추가
import { UserProvider } from './components/UserProvider'; // or wherever you define UserProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import SessionCheck from "./components/SessionCheck";



function App() {

    return (
        <UserProvider>
            <div className="App">
                <Router>
                    <SessionCheck/>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Content/>}/>
                        <Route path="/detail/:gymName" element={<Detail/>}/>
                        <Route path="/Login" element={<Login/>}/>
                        <Route path="/SignUp" element={<SignUp/>}/>
                        <Route path="/MyPage" element={<MyPage/>}/>
                    </Routes>
                    <Footer/>
                </Router>
            </div>
        </UserProvider>
    );
}


export default App;
