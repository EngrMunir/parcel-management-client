import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Pages/Error/Error";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import BookAParcel from "../Pages/Dashboard/BookParcel/BookAParcel";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import AllParcels from "../Pages/Dashboard/AllParcels/AllParcels";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },        
      ]
    },
    {
      path:'/dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        // normal user routes
        {
          path:'bookParcel',
          element:<BookAParcel></BookAParcel>
        },
        {
          path:'myParcels',
          element:<MyParcels></MyParcels>
        }
        // moderator routes
        // admin routes
        ,{
          path:'allUser',
          element:<AllUsers></AllUsers>
        },
        {
          path:'allParcels',
          element:<AllParcels></AllParcels>
        },
      ]
    }
  ]);
  