import React from 'react';
import Headers from '../Navbar/Headers';
import Slideshow from '../Slideshow/Slideshow';
function Home(props) {
    return (
        <div>
             <Headers/>          
             <Slideshow/> 
        </div>
    );
}

export default Home;