import React, { useEffect } from 'react';
import '../styles/ImageSlider.css'

const ImageSlider = ({ imageUrls, activeIndex, handleSlide, handleChange }) => {
    console.log(imageUrls)
    const images = imageUrls.map((url, index) => {
        const shootRenderUrl = index === activeIndex;

        const imageToRender = shootRenderUrl ?
            <div>
                <img src={url} />
            </div>
            :
            <div></div>

        return imageToRender;
    })

    const dots = imageUrls.map((_, index) =>
        <button onClick={() => {
            handleChange(index)
        }}>*</button>
    )

    useEffect(() => {

        console.log(activeIndex)
    }, [activeIndex]);

    return (
        <div id="slideshow">
            {images}
            {dots}


            <button onClick={() => {
                handleSlide(1)
            }}>Next</button>

            <button onClick={() => {
                handleSlide(-1)
            }}>Previous</button>
        </div>


    );
}

export default ImageSlider;