import React from 'react';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import Categories from '../pages/admin/categories/Categories'
import Comment from '../pages/admin/engagement_pages/Comment';
import Like from '../pages/admin/engagement_pages/Like';
import Watchlist from '../pages/admin/engagement_pages/Watchlist';
import Episode from '../pages/admin/media_management/Episode';
import Movie from '../pages/admin/media_management/Movie';
import Trailer from '../pages/admin/media_management/Trailer';
import Profile from '../pages/admin/profile/Profile'
import UserPages from '../pages/admin/uses_pages/UserPages'
import Feature from '../pages/admin/vip/Feature';
import Package from '../pages/admin/vip/Package';
import Plans from '../pages/admin/vip/Plans';
import Actor from '../pages/admin/cast_crew/Actor';
import Author from '../pages/admin/cast_crew/Author';
import Character from '../pages/admin/cast_crew/Character';
import {Route, Routes } from 'react-router-dom';

function AdminRouters(props) {
    const routes = [
        { path: "/",element: <Dashboard /> },
        { path: "/categories/categories",element: <Categories /> },
        { path: "/engagement_pages/comment",element: <Comment /> },
        { path: "/engagement_pages/like",element: <Like /> },
        { path: "/engagement_pages/watchlist",element: <Watchlist /> },
        { path: "/media_management/episode",element: <Episode /> },
        { path: "/media_management/movie",element: <Movie /> },
        { path: "/media_management/trailer",element: <Trailer /> },
        { path: "/profile/profile",element: <Profile /> },
        { path: "/uses_pages/userpages",element: <UserPages /> },
        { path: "/vip/feature",element: <Feature /> },
        { path: "/vip/package",element: <Package /> },
        { path: "/vip/plans",element: <Plans /> },
        { path: "/cast_crew/actor",element: <Actor /> },
        { path: "/cast_crew/author",element: <Author /> },
        { path: "/cast_crew/character",element: <Character /> },

    ]

    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    );
}

export default AdminRouters;