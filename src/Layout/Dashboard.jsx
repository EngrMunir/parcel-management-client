import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaHome, FaList, FaUsers} from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";

import { MdRateReview } from "react-icons/md";

import { CgProfile } from "react-icons/cg";
import useAdmin from "../hooks/useAdmin";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";

const Dashboard = () => {
    const axiosSecure = useAxiosSecure();
    const [isDeliveryMen, setIsDeliveryMen]= useState(false);
    const {user} = useContext(AuthContext);
    const userEmail = user.email;
    // console.log(userEmail);
    useEffect(()=>{
        axiosSecure.get(`/users/deliveryMen/${userEmail}`)
        .then(res=>{
            console.log(res.data);
          const {isDeliveryMen}= res.data;
          setIsDeliveryMen(isDeliveryMen);
        })
        .catch(error=>{
          console.log('error in role delivery men ',error);
        })
    },[axiosSecure, userEmail])


    // TODO:get admin value from the database

    const [isAdmin] = useAdmin();
    // const isAdmin =true;
    return (
        <div className="flex">
            <div className="w-64 min-h-full bg-orange-400">
                <ul className="menu">
                    {
                        isAdmin? (
                        <>
                            <li><NavLink to="/dashboard/allParcels">
                                 <FaHome></FaHome>
                                 All Parcels</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/users">
                                <FaUsers></FaUsers>
                                All Users</NavLink>
                            </li>
                            <li><NavLink to="/dashboard/allDeliveryMen">
                                <FaList></FaList>
                                 All Delivery Men</NavLink>
                             </li>
                            <li><NavLink to="/dashboard/statistics">
                            <FaAd></FaAd>
                             Statistics</NavLink>
                            </li>
                        </>
                        )
                        : isDeliveryMen?
                        
                        (<>
                        {/* delivery man */}
                        <li><NavLink to="/dashboard/myDeliveryList">
                            <FaList />
                                My Delivery List</NavLink>
                        </li>
                        <li><NavLink to="/dashboard/myReviews">
                            <MdRateReview />
                            My Reviews</NavLink>
                        </li>    
                        </>):
                        (
                            <>
                                {/* user */}
                                <li><NavLink to="/dashboard/bookParcel">
                                <TbBrandBooking />
                                    Book a Parcel </NavLink>
                                </li>
                                <li><NavLink to="/dashboard/myParcels">
                                <MdProductionQuantityLimits />
                                    My Parcels</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/myProfile">
                                <CgProfile />
                                    My Profile</NavLink>
                                </li>
                            </>
                        )
                    }
                        {/* shared navlinks */}
                    <div className="divider"></div> 
                    <li><NavLink to="/">
                        <FaHome></FaHome>
                        Home</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;