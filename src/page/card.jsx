import {useNavigate} from 'react-router-dom';
import ImageSlider from "./ImageSlider";
import 'react-datepicker/dist/react-datepicker.css';
import '../css/Card.css';
import Calendar from "./Calender"  // Fixed the import here
import Modal from 'react-modal';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../components/UserProvider";

const Card = ({data, type, totalData}) => {
    const {user, setUser, logout} = useContext(UserContext);

    const navigate = useNavigate();
    let history;
    let imageSliderProps;
    const [modalIsOpen, setIsOpen] = useState(false);


    if (type === 'content') {
        imageSliderProps = data.pointImagePath;
    } else if (type === 'trainer') {
        imageSliderProps = data.trainerImage;
        history = data.trainerHistory;
    }

    const handleClick = () => {
        navigate(`/Detail/${data.pointName}`, {state: {data: data}});
    };

    const handleReservation = () => {
        console.log("handleReservation is called!");
        if (!user) {
            alert("로그인을 진행해야합니다.")
            return;
        }
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
            border: '1px solid green',
            borderRadius: '10px',

        }
    };

    return (
        type === 'content' ? (
            <div className="card m-2" onClick={handleClick}>
                <div className="row no-gutters">
                    <div className="col-md-6">
                        <ImageSlider imageSliderProps={imageSliderProps}/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h5 className="card-title">{data.pointName}</h5>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            type === 'trainer' ? (
                <div className="card card-trainer m-2">
                    <div className="row no-gutters">
                        <div className="col-md-6">
                            <ImageSlider imageSliderProps={imageSliderProps}/>
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <div className="button-container-trainer">
                                    <button className="button-trainer" onClick={handleReservation}>Make a P.T reservation</button>
                                </div>
                                <div className='trainer-nameTag'>
                                    <h2 className="trainer-label">trainer
                                        <span className="trainer-name">{data.name}</span>
                                    </h2>
                                </div>
                                <div className="trainer-info">
                                    <span className="prize-history-label">트레이너 이력</span>
                                    <div className="prize-history-label-content">
                                        {history.map((item, index) => (
                                            <div key={index}>
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Reservation Modal"
                        style={customStyles}
                    >
                        <div className="modal-header">
                            <h2>Make a reservation</h2>
                            <button onClick={closeModal}>close</button>
                        </div>
                        <div className="modal-content">
                                <Calendar data={data} totalData={totalData} closeModal={closeModal}/>
                        </div>
                    </Modal>
                </div>
            ) : null
        )
    );
};

export default Card;
