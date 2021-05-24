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




import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/ImageSlider.css';


const ImageSlider = ({ place }) => {

    // <ImageSlider imageUrls={imageUrls} activeIndex={activeIndex} translateValue={translateValue} slidePrev={handleGoToPrevSlide} slideNext={handleGoToNextSlide} slideWidth={slideWidth} />

    const [activeIndex, setActiveIndex] = useState(0);

    const [translateValue, setTranslateValue] = useState(0);

    const getRandomNumber = () => Math.floor(Math.random() * 600)
    const [imageUrls, setImageUrls] = useState([

        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),

    ]);


    const slidePrev = () => {
        if (activeIndex === 0) {
            return;
        } else {
            setActiveIndex(prevState => prevState - 1);
            setTranslateValue(prevState => prevState + slideWidth())
        }

    }


    const slideNext = () => {
        if (activeIndex === imageUrls.length - 1) {
            setActiveIndex(0);
            setTranslateValue(0);
        } else {
            setActiveIndex(prevState => prevState + 1);
            setTranslateValue(prevState => prevState + -(slideWidth()))
        }

    }

    const slideWidth = () => {
        return document.querySelector('.slide').clientWidth
    }

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

        const apiUrl = `https://commons.wikimedia.org/w/api.php?format=json&action=query&generator=geosearch&ggsprimary=all&ggsnamespace=6&ggsradius=500&ggscoord=${place.lat}|${place.lng}&ggslimit=20&prop=imageinfo&iilimit=1&iiprop=url&iiurlwidth=800&iiurlheight=600&origin=*`;

        fetch(apiUrl)

            .then((response) => response.json())
            .then((data) => {
                var urls = Object.values(data.query.pages).map(page => page.imageinfo[0].thumburl)
                setImageUrls(urls)
            });


    }, [place]);

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




