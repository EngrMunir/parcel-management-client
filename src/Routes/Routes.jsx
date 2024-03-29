import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";


import AddParcels from "../Pages/Dashboard/AddParcels/AddParcels";
import AdminRoute from "./AdminRoute";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import AllParcels from "../Pages/Dashboard/AllParcels/AllParcels";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllDeliveryMen from "../Pages/Dashboard/AllDeliveryMen/AllDeliveryMen";
import Statistics from "../Pages/Dashboard/Statistics/Statistics";
import PrivateRoute from "./PrivateRoute";
import MyDeliveryList from "../Pages/Dashboard/MyDeliveryList/MyDeliveryList";
import MyReviews from "../Pages/Dashboard/MyReviews/MyReviews";
import Payment from "../Pages/Dashboard/Payment/Payment";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import UpdateParcel from "../Pages/Dashboard/UpdateParcel/UpdateParcel";
import CheckoutForm from "../Pages/Dashboard/Payment/CheckoutForm";
import UpdateUser from "../Pages/Dashboard/UpdateUser/UpdateUser";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"login",
            element:<Login></Login>
        },
        {
            path:"signUp",
            element:<SignUp></SignUp>
        }
      ]
    },
    {
      path:'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        // normal user routes
        {
          path:'bookParcel',
          element:<AddParcels></AddParcels>
        },
        {
          path:'myParcels',
          element:<MyParcels></MyParcels>
        },
        {
          path:'updateParcel/:id',
          element:<UpdateParcel></UpdateParcel>,
          // loader: ({params})=>fetch(`http://localhost:5000/parcels/update/${params.id}`)
        },
        {
          path:'updateUser/:id',
          element:<UpdateUser></UpdateUser>
        },
        {
          path:'myProfile',
          element:<MyProfile></MyProfile>
        },
        {
          path:'payment',
          element:<Payment></Payment>
        },
        {
          path:'checkout',
          element:<CheckoutForm></CheckoutForm>
        },
        // admin only routes
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:'allParcels',
          element:<AllParcels></AllParcels>
        },
        {
          path:'allDeliveryMen',
          element:<AllDeliveryMen></AllDeliveryMen>
        },
        {
          path: 'statistics',
          element:<Statistics></Statistics>
        },
        // delivery Men Routes
        {
          path:'myDeliveryList',
          element:<MyDeliveryList></MyDeliveryList>
        },
        {
          path:'myReviews',
          element:<MyReviews></MyReviews>
        }
      ]
    }
  ]);
  