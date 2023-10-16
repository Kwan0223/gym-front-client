import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    // useEffect(() => {
    //     // 서버에 현재 로그인 상태를 확인하는 요청
    //     console.log("TSET  UserProvider !! ::   ")
    //     console.log("TSET  UserProvider  user  !! ::   " , user)
    //     axios.get('http://localhost:8080/api/v1/checkSession')
    //         .then(response => {
    //             // 서버에서 반환된 사용자 정보를 상태에 설정
    //             console.log("TEST response UserProvider:::: " , response)
    //             setUser(response.data);
    //         })
    //         .catch(error => {
    //             console.error("로그인 상태 확인 중 오류 발생:", error);
    //             setUser(null);
    //         });
    // }, []);


    useEffect(() =>{
        console.log("TEST USER ::" , user)
    },[user])

    const logout = () => {
        setUser(null);


    };


    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};
