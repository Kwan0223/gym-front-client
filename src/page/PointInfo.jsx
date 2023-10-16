import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ImageSlider from "./ImageSlider";
import '../css/PointInfo.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import KakaoMap from "./KakaoMap";

const PointInfo = (props) => {
    useEffect(() => {
        console.log("TEST PointInfo Data : " , props)
    },[])

    let data = props.data;

    return (
        <div className="PointInfo">
            <div className="KakaoMap">

                <KakaoMap address={data.pointAddress}></KakaoMap>
            </div>
            <div className="gymInfo">
                <div className="gymAddress">
                    <span className="address">주소</span>
                    <span>{data.pointAddress}</span>
                </div>
                <div className="gymNumber">
                    <span  className="phone">전화번호</span>
                    <span>{data.managerPhone}</span>
                </div>
                <div className="gymPrice">
                    <span className="price">가격</span>
                    <div>
                        {data.productInfo.map((item, index) =>(
                            <span key={index}>{item}</span>
                        ))}
                    </div>
                </div>
                <div className="gymTags">
                    <span className="tag">해시태그</span>
                    <div>
                        {data.tagInfo.map((item, index) => (
                            <span key={index}>#{item}</span>
                        ))}
                    </div>
                </div>
                <div className="gymInfoText">
                    <span className="info">소개글</span>
                    <span className="infoText">{data.info}</span>
                </div>
            </div>
        </div>
    );
};

export default PointInfo;
