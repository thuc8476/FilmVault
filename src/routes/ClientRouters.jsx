import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/client/Main/Main';
import Support from '../pages/client/Support/Support';
import Blog from '../pages/client/Blog/Blog';
import MovieRental from '../pages/client/Navbar/MovieRental';
import LatestTVShows from '../pages/client/LatestTVShows/LatestTVShows';
import LatestMovies from '../pages/client/LatestMovies/LatestMovies';
import Accounts from '../pages/client/Accounts/Accounts';
import AccountsInfor from '../pages/client/Accounts/AccountsInfor';
import AccountsLabrary from '../pages/client/Accounts/AccountsLabrary';
import AccountsOffer from '../pages/client/Accounts/AccountsOffer';
import AccountsSubscription from '../pages/client/Accounts/AccountsSubscription';
import MoviePage from '../pages/client/MoviePage/MoviePage'
import SubscriptionPlans from '../pages/client/SubscriptionPlans/SubscriptionPlans'
import PaymentPage from '../pages/client/PaymentPage/PaymentPage'
function ClientRouters(props) {
  const routes = [
    { path: "/", element: <Main /> },
    { path: "/Support", element: <Support /> },
    { path: "/Blog", element: <Blog /> },
    { path: "/MovieRental", element: <MovieRental /> },
    { path: "/LatestTVShows", element: <LatestTVShows /> },
    { path: "/LatestMovies", element: <LatestMovies /> },
    { path: "/MoviePage", element: <MoviePage/> },
    { path: "/SubscriptionPlans", element: <SubscriptionPlans/> },
    { path: "/PaymentPage", element: <PaymentPage/> },
    
    { 
      path: "/Accounts", 
      element: <Accounts />,
      subRoutes: [
        { path: "", element: <AccountsInfor /> },
        { path: "labrary", element: <AccountsLabrary /> },
        { path: "offer", element: <AccountsOffer /> },
        { path: "sub", element: <AccountsSubscription /> }
      ]
    }
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.subRoutes &&
            route.subRoutes.map((subRoute, subIndex) => (
              <Route key={subIndex} path={subRoute.path} element={subRoute.element} />
            ))
          }
        </Route>
      ))}
    </Routes>
  );
}

export default ClientRouters;
