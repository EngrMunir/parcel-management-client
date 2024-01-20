import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";

const Dashboard = () => {

    // TODO:get admin value from the database

    const isAdmin =true;
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
                             <li><NavLink to="/dashboard/bookParcel">
                        <FaHome></FaHome>
                        Book a Parcel </NavLink>
                    </li>
                    <li><NavLink to="/dashboard/myParcels">
                        <FaShoppingCart></FaShoppingCart>
                        My Parcels</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/myProfile">
                        <FaShoppingCart></FaShoppingCart>
                        My Profile</NavLink>
                    </li>
                        </>
                    }
                    {/* User */}
                   

                    {/* delivery man */}
                    <li><NavLink to="/dashboard/myDeliveryList">
                        <FaShoppingCart></FaShoppingCart>
                        My Delivery List</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/myReviews">
                        <FaShoppingCart></FaShoppingCart>
                        My Reviews</NavLink>
                    </li>
                    {/* admin */}
                    
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