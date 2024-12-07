import React from 'react';
import SlideShowmovie from '../Slideshow/SlideShowmovie';
import Slideshow from '../Slideshow/Slideshow';
import SlideShowmovies from '../Slideshow/SlideShowmovies';

function Main(props) {
    return (
        <div>
            <Slideshow></Slideshow>
            <SlideShowmovie></SlideShowmovie>
            <SlideShowmovies/>
        </div>
    );
}

export default Main;