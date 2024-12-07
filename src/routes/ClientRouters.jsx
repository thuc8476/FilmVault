import React from 'react';
import Main from '../pages/client/Main/Main';
import { Route, Routes } from 'react-router-dom';
import Support from '../pages/client/Support/Support';
function ClientRouters(props) {
    const routes = [
        { path: "/", element: <Main /> },
        { path: "/Support", element: <Support/>}
    ]
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    );
}


export default ClientRouters;