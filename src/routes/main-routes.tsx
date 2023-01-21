import { useRoutes, Navigate} from "react-router-dom";
import * as React from 'react';
import StockDetailPage from '../views/StockDetailPage'
import HomePage from "../views/HomePage";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import HomeSearchBar from "../components/search-bar/HomeSearchBar";
import type {RootState} from '../redux/store'
import { useAppSelector } from '../redux/store'
import Account from "../views/Account";



const MainRoutes = () => {
    // Check if user is currently logged in, if not redirect to login page
    const user = useAppSelector((state: RootState) => state.userApi)


    return useRoutes([
        {
            path: '/account',
            element: user ? <Account /> : <Navigate to="/" />  
        },
        {
            path: '/login',
            element: user ? <Navigate to="/" /> : <Login /> 
        },
        {
            path: '/sign-up',
            element: user ? <Navigate to="/" /> : <SignUp /> 
        },
        {
            path: '/quote/:symbol',
            element: <><HomeSearchBar /><StockDetailPage /></>
        },
        {
            path: '/',
            // Important: If user is not logged in, redirect to Login page
            element: <><HomeSearchBar/><HomePage /></>
        },
        {
            path: '*',
            // If path does not exist above, redirect to homepage
            element: <Navigate to=""/>
        }
    ])
}
 
export default MainRoutes; 