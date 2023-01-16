import { useRoutes, } from "react-router-dom";
import * as React from 'react';
import StockDetailPage from '../views/StockDetailPage'
import HomePage from "../views/HomePage";
import Login from "../views/Login";


const MainRoutes = () => {
    // Check if user is currently logged in, if not redirect to login page
    return useRoutes([
   
        {
            path: '/login',
            element: <Login /> 
        },
        {
            path: '/quote/:symbol',
            element: <StockDetailPage />
        },
        {
            path: '/',
            // Important: If user is not logged in, redirect to Login page
            element: <HomePage />
        }
    ])
}
 
export default MainRoutes; 