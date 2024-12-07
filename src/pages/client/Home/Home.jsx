import React from 'react';
import Headers from '../Navbar/Headers';
import ClientRouters from '../../../routes/ClientRouters';
import Footer from '../Navbar/footer';
import Login from '../Navbar/Login';
import Signing from '../Navbar/Signing';
function Home(props) {
    return (
        <div>
             <Headers/>          
             <Login/>
             <Signing/>
             <ClientRouters/>
             <Footer/>
        </div>
    );
}

export default Home;