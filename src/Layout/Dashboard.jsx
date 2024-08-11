import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex'>
            {/* sidebar */}
            <div className='w-64 min-h-full bg-orange-400'>
                <ul className='menu p-4'>
                    <li><NavLink to="/dashboard/bookParcel">Book a parcel</NavLink></li>
                    <li><NavLink to="/dashboard/myParcels">My Parcels</NavLink></li>
                    <li><NavLink to="/dashboard/myProfile">My Profile</NavLink></li>
                    <li><NavLink to="/dashboard/myDeliveryList">My Delivery List</NavLink></li>
                    <li><NavLink to="/dashboard/myReviews">My Reviews</NavLink></li>
                    <li><NavLink to="/dashboard/allParcels">All Parcels</NavLink></li>
                    <li><NavLink to="/dashboard/allUser">All Users</NavLink></li>
                    <li><NavLink to="/dashboard/allDeliveryMen">All Delivery Men</NavLink></li>
                    <li><NavLink to="/dashboard/statistics">Statistics</NavLink></li>
                    <div className="divider"></div>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;