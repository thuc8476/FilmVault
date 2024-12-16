import React from 'react';
import Headers from '../Navbar/Headers';
import ClientRouters from '../../../routes/ClientRouters';
import Footer from '../Navbar/footer';
function Home(props) {
    return (
        <div>
             <Headers/>          
             <ClientRouters/>
             <Footer/>
        </div>
    );
}

export default Home;