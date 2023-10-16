import {useEffect} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";


const SessionCheck = () => {
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        // 페이지 이동 시마다 세션 체크 API 호출
        // axios.get('http://localhost:8080/api/v1/checkSession', { withCredentials: true })
        axios.get('/api/v1/checkSession', { withCredentials: true })
            .then(response => {
                if (response.data === "No session found") {
                    console.error('세션이 유효하지 않습니다.');
                    // 필요한 경우 여기서 로그인 페이지로 리디렉션
                }
            })
            .catch(error => {
                console.error('API 호출 중 에러 발생:', error);
            });
    }, [navigate,location]);

    return null
};

export default SessionCheck;