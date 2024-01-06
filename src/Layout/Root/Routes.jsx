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
import PrivateRoute from "../../Components/PrivateRoute/PrivateRoute";
import BidJob from "../../Pages/BidJobs/BidJob";
import UpdateJob from "../../Pages/UpdateJob/UpdateJob";
import Bookmark from "../../Pages/Bookmark/Bookmark";
import Dashboard from "../../Pages/Dashboard/Dashboard";

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
                path:'/addJob',
                element:<PrivateRoute><AddJob></AddJob></PrivateRoute>
            },
            {
                path:'/myPostedJob',
                element:<PrivateRoute><MyPostedJob></MyPostedJob></PrivateRoute>
            },
            {
                path:'/myBids',
                element:<PrivateRoute><MyBids></MyBids></PrivateRoute>
            },
            {
                path:'/bidRequest',
                element:<PrivateRoute><BidRequest></BidRequest></PrivateRoute>
            },
            {
                path:'/bidJob/:id',
                element:<PrivateRoute><BidJob></BidJob></PrivateRoute>,
                loader:({params})=> fetch(`https://skill-exchange-server.vercel.app/api/bidJobs/${params.id}`)
            },
            {
                path:'/updatejob/:id',
                element:<PrivateRoute><UpdateJob></UpdateJob></PrivateRoute>,
                loader:({params})=> fetch(`https://skill-exchange-server.vercel.app/api/bidJobs/${params.id}`)
            },
            {
                path:"/bookmark",
                element:<Bookmark></Bookmark>
            },
            


        ]
    },
    {
        path:'/dashBoard',
        element:<Dashboard></Dashboard>
    },
    {
        path:'signIn',
        element:<SignIn></SignIn>
    },
    {
        path:'signUp',
        element:<SignUp></SignUp>
    }
   ])


export default routes;