import React, {useContext, useEffect, useState, useRef} from 'react';
import '../css/MyPage.css';
import {UserContext} from "../components/UserProvider";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const MyPage = () => {
    const {user, setUser, logout} = useContext(UserContext);
    const [imageSrc, setImageSrc] = useState(null);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);

    const [userInfo, setUserInfo] = useState({
        address: user ? user.address : "",
        phone: user ? user.number : "",
        imagePath: ""
    });


    const fileInput = useRef();
    const navigate = useNavigate();
    const newPasswordRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Create an Object URL
            const objectURL = URL.createObjectURL(file);
            console.log("Object URL:", objectURL);

            // Assign it to the image source
            setImageSrc(objectURL);
            setUserInfo(prevState => ({ ...prevState, imagePath: objectURL }));
        } else {
            setImageSrc(null);
        }
    };
    const handleEditProfileClick = () => {
        fileInput.current.click();
    };

    const handleSavePassword = () => {
         console.log("TEST User Pwd : " , user.pwd)

        if (newPassword !== passwordConfirmation) {
            alert(' 두개의 비밀번호가 다릅니다. 확인부탁드립니다.');
            setPasswordConfirmation("");
            newPasswordRef.current.focus();
            return;
        }

        const userInfo = {
            email: user.email,
            newPwd: newPassword
        };
        // axios.post('http://localhost:8080/api/v1/users/changePassword', userInfo)
        axios.post('/api/v1/users/changePassword', userInfo)
            .then(response => {

                setPasswordChanged(true);
                setIsPasswordModalOpen(false);
            })
            .catch(error => {
                console.error(error);
                if (error.response && error.response.data) {
                    console.log("서버로부터의 메시지:", error.response.data.msg); // 서버로부터의 메시지를 출력합니다.
                    alert(error.response.data.msg);
                    setIsPasswordModalOpen(true);
                    return
                }
            });

        setPasswordChanged(true);
        setIsPasswordModalOpen(false);
    };
    useEffect(() => {
        if(user == null){
            navigate('/')
        }
    }, [user])



    const handleOpenPasswordModal = () => {
        setNewPassword('');
        setPasswordConfirmation('');
        setIsPasswordModalOpen(true);
    };

    const handleClosePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };

    const handleSave = () => {
        // const serverUrl = "http://localhost:8080/api/v1/users/updateProfile";
        const serverUrl = "/api/v1/users/updateProfile";

        const data = {
            email: user.email,
            ...userInfo
        };

        axios.post(serverUrl, data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };
    return (
        <div className="MyPage-container">
            <div className="MyPage-image-container">
                { !imageSrc ? (
                    <p>There is no image</p>
                ) : (
                    <img className="MyPage-image" src={imageSrc} alt="MyPage" />
                )}
                <input type="file" ref={fileInput} onChange={handleImageUpload} style={{display: 'none'}} />
            </div>
            <div className="info-container">
                {user && (
                    <div>
                        <label>Name: </label>
                        <input type="text" defaultValue={user.name} readOnly={true}/>
                    </div>
                )}
                {user && (
                    <div>
                        <label>Address: </label>
                        <input type="text" defaultValue={user.address} />
                    </div>
                )}
                {user && (
                    <div>
                        <label>Phone: </label>
                        <input type="text" defaultValue={user.number} />
                    </div>
                )}
                {passwordChanged && <p>비밀번호 변경되었습니다.</p>}
                <div>
                    <button className="edit-MyPage-button" onClick={handleEditProfileClick}>Edit Profile</button>
                    <button className="change-password-button" onClick={handleOpenPasswordModal}>Change Password</button>
                    <button className="save-button">Save</button>
                </div>
            </div>



    {isPasswordModalOpen && (
                <div className="password-modal">
                    <h2>Change Password</h2>
                    <div>
                    <span>변경할 비밀번호</span>
                    <input
                        ref={newPasswordRef}
                        type="password"
                        className="password-input"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    </div>
                    <div>
                        <span>변경할 비밀번호 확인</span>
                    <input
                        type="password"
                        className="password-input"
                        placeholder="Confirm new password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    </div>

                    <div className="password-buttons">
                        <button className="save-button" onClick={handleSavePassword}>Save</button>
                        <button className="close-button" onClick={handleClosePasswordModal}>Close</button>
                    </div>
                </div>
            )}
        </div>

    );
}

export default MyPage;
