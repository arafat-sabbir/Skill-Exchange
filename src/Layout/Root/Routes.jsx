import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";
import Root from "./Root";
import SignUp from "../../Pages/SignUp/SignUp";
import SignIn from "../../Pages/SignIn/SignIn";
import AddJob from "../../Pages/AddJob/AddJob";
import MyPostedJob from "../../Pages/MyPostedJob/MyPostedJob";
import MyBids from "../../Pages/MyBIds/MyBids";
import BidRequest from "../../Pages/BidRequests/BidRequest";

const routes = createBrowserRouter([
    {
        path:"/",
        errorElement:<ErrorPage></ErrorPage>,
        element:<Root></Root>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'signIn',
                element:<SignIn></SignIn>
            },
            {
                path:'signUp',
                element:<SignUp></SignUp>
            },
            {
                path:'/addJob',
                element:<AddJob></AddJob>
            },
            {
                path:'/myPostedJob',
                element:<MyPostedJob></MyPostedJob>
            },
            {
                path:'/myBids',
                element:<MyBids></MyBids>
            },
            {
                path:'/bidRequest',
                element:<BidRequest></BidRequest>
            }


        ]
    }
   ])


export default routes;