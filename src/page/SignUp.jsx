import React, {useState} from 'react';
import '../css/SingUp.css';
import axios from "axios";

const SignUp = () => {
    const [userInfo , setUserInfo ] = useState({

        name : '',
        email : '',
        address : '',
        number : '',
        pwd : '',
        pwdCheck : ''
    });
    const handleChange = (event) => {
        setUserInfo({...userInfo, [event.target.name]: event.target.value});
    };

    const dataCheck = (data) => {
        console.log("TEST User Info : " , userInfo)
        console.log("TEST data : " , data)
        if(!userInfo.name){
            alert("이름을 작성하지 않았습니다.")
        }else if(!userInfo.email){
            alert("이메일을 작성하지 않았습니다.")
        }else if (!userInfo.pwd){
            alert("비밀번호를 작성하지 않았습니다")
        }else if(!userInfo.pwdCheck){
            alert("비밀번호 확인을 작성해주세요.")
        }else if(userInfo.pwd !== userInfo.pwdCheck){
            alert("비밀번호가 일치하지 않습니다.")
        } else if (data == 'pwd'){
            alert ("비밀번호 유효성 체크 부탁드립니다.")
        } else if (data == 'email'){
            alert("이메일 유효성 체크 부탁드립니다.")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dataCheck();


        // axios.post('http://localhost:8080/signUp', userInfo, {
        axios.post('/signUp', userInfo, {
            headers : {
                "Content-Type" : "application/json",
            },
        })
            .then(res => {
                console.log("TEST RES  : ", res);
                console.log("TEST RESDATA  : ", res.data);
                console.log("TEST UserInfo : " , userInfo)
                if(res != 'Success'){

                    if(res.data == 'PwdCheck') {
                        dataCheck('pwd');
                    }else if (res.data == 'EmailCheck'){
                        dataCheck('email');
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    };


    return (
        <div className="signup-container">
            <div className="signup-content">
                <h2 className="signup-heading">회원가입</h2>
                <form className="signup-form">
                    <div className="form-group">
                        <input type="text" id="name" name="name" placeholder="이름" className="form-input"  onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" name="email" placeholder="이메일" className="form-input"  onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" id="address" name="address" placeholder="주소" className="form-input"  onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" id="number" name="number" placeholder="핸드폰번호(ex 01076778240)" className="form-input"  onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" id="pwd" name="pwd" placeholder="비밀번호" className="form-input"  onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" id="pwdCheck" name="pwdCheck" placeholder="비밀번호 확인" className="form-input" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="signup-button" onClick={handleSubmit}>회원가입</button>
                    </div>
                </form>
                <div className="login-link">
                    이미 회원이신가요? <a href="/login">로그인</a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
