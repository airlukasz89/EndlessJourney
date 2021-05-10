// const Slide = ({ image }) => {
//     const styles = {
//         backgroundImage: `url(${image})`,
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: '50% 60%'
//     }
//     return <div className="slide" style={styles}></div>
// }



const LeftArrow = (props) => {
    return (
        <div className="backArrow arrow" onClick={props.goToPrevSlide}>
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </div>
    );
}


const RightArrow = (props) => {
    return (
        <div className="nextArrow arrow" onClick={props.goToNextSlide}>
            <FontAwesomeIcon icon={faArrowRight} size="2x" />
        </div>
    );
}




import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/ImageSlider.css';


const ImageSlider = ({ imageUrls, activeIndex, translateValue, slidePrev, slideNext }) => {

    console.log(imageUrls);
    const images = imageUrls.map((url, index) => <div key={index} className="slide" style={{
        backgroundImage: `url("${url}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%'
    }}>
    </div>)

    const dots = imageUrls.map((_, index) =>
        <button className={index === activeIndex ? "active" : ""} onClick={() => {
            handleChange(index)
        }}>*</button>
    );



    useEffect(() => {


    }, [activeIndex]);

    return (

        <div className="slider">

            <div className="slider-wrapper"
                style={{
                    transform: `translateX(${translateValue}px)`,
                    transition: 'transform ease-out 0.45s'
                }}>
                {
                    images
                }
            </div>

            <LeftArrow
                goToPrevSlide={slidePrev}
            />

            <RightArrow
                goToNextSlide={slideNext}
            />
        </div>

    );
}

export default ImageSlider;




