import React, { useEffect } from 'react';
import '../styles/ImageSlider.css'

const ImageSlider = ({ imageUrls, activeIndex, handleChange }) => {
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

    useEffect(() => {

        console.log(activeIndex)
    }, [activeIndex]);

    return (
        <div id="slideshow">
            {images}
            <button onClick={() => {
                handleChange(1)
            }}>Next</button>

            <button onClick={() => {
                handleChange(-1)
            }}>Previous</button>
        </div>


    );
}

export default ImageSlider;