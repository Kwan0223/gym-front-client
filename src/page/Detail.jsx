import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import '../css/Detail.css';
import PointInfo from "./PointInfo";
import TrainerInfo from "./TrainerInfo ";

const Detail = () => {
    const location = useLocation();
    const {data} = location.state;
    const [activeTab, setActiveTab] = useState('point-Info');

    return (
        <div className="gymContent">
            <div className='pointName'>
                <h2>{data.pointName}</h2>
            </div>
            <div className="gymImgs">
                <div className="leftImages">
                    <img src={data.pointImagePath[0]} alt={`gym 1`} id={`img1`} />
                </div>
                <div className="rightUpImages">
                    <img src={data.pointImagePath[1]} alt={`gym 2`} id={`img2`} />
                </div>
                <div className="rightDownImages">
                    <img src={data.pointImagePath[2]} alt={`gym 3`} id={`img3`} />
                    <img src={data.pointImagePath[3]} alt={`gym 4`} id={`img4`} />
                </div>
            </div>
            <div className="point-Buttons">
                <button
                    className={`point-Button point-Info ${activeTab === 'point-Info' ? 'active' : ''}`}
                    onClick={() => setActiveTab("point-Info")}>
                    헬스장 정보
                </button>
                <button
                    className={`point-Button point-TrainerInfo ${activeTab === 'point-TrainerInfo' ? 'active' : ''}`}
                    onClick={() => setActiveTab("point-TrainerInfo")}>
                    트레이너 정보
                </button>
            </div>
            <div className="selected-Content">
                {activeTab === 'point-Info' && <PointInfo data={data} />}
                {activeTab === 'point-TrainerInfo' && <TrainerInfo data={data} />}
            </div>
        </div>
    );
};

export default Detail;
