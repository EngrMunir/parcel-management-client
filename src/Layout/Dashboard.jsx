import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-full bg-orange-400">
                <ul className="menu">
                    {/* User */}
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
                    <li><NavLink to="/dashboard/allParcels">
                        <FaShoppingCart></FaShoppingCart>
                        All Parcels</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/allUsers">
                        <FaShoppingCart></FaShoppingCart>
                        All Users</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/allDeliveryMen">
                        <FaShoppingCart></FaShoppingCart>
                        All Delivery Men</NavLink>
                    </li>
                    <li><NavLink to="/dashboard/statistics">
                        <FaShoppingCart></FaShoppingCart>
                        Statistics</NavLink>
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