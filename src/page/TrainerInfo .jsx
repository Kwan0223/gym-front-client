import React, { useEffect, useState } from 'react';
import Card from "./card";
import '../css/TrainerInfo.css'

const TrainerInfo = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const trainerInfo = props.data.trainerInfo;

    return (
        <div>
            <div className="card-container">
                {trainerInfo ? (
                    <Card data={trainerInfo[currentIndex]} type="trainer" totalData={props} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="button-container">
                {trainerInfo && trainerInfo.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`index-button-trainer ${currentIndex === index ? 'index-button-trainer-selected' : ''}`}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TrainerInfo;
