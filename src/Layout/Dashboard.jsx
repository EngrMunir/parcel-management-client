import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaHome, FaList, FaUsers} from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";

import { MdRateReview } from "react-icons/md";

import { CgProfile } from "react-icons/cg";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {

    // TODO:get admin value from the database

    const [isAdmin] = useAdmin();
    // const isAdmin =true;
    return (
        <div className="flex">
            <div className="w-64 min-h-full bg-orange-400">
                <ul className="menu">
                    {
                        isAdmin ? 
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
                        :
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
                    }
                   
                
                    {/* delivery man */}
                    <li><NavLink to="/dashboard/myDeliveryList">
                    <FaList />
                        My Delivery List</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/myReviews">
                    <MdRateReview />
                        My Reviews</NavLink>
                    </li>
                    
                    
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