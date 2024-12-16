import React from 'react';
import Slideshow from '../Slideshow/Slideshow';
import HomeContent from '../Slideshow/HomeContent';
import PremiumFeatures from '../Slideshow/PremiumFeatures';
import MoviePlans from '../Slideshow/MoviePlans';

function Main(props) {
    return (
        <div>
            <Slideshow/>
            <HomeContent/>
            <PremiumFeatures/>
            <MoviePlans/>
        </div>
    );
}

export default Main;