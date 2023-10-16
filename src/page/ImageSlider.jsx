import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/ImageSlider.css";

const ImageSlider = (props) => {
     const images =props.imageSliderProps;




    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000
    };

    return (
        <div className="slider-container">
            <div className="slider-section">
                <Slider {...settings}>
                    {images && images.map((image, index) => (
                        <div key={index} className="card-image-container">
                            <img className="card-image" src={image} alt={`room-${index}`} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ImageSlider;
