import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex'>
            {/* sidebar */}
            <div className='w-64 min-h-full bg-orange-400'>
                <ul className='menu p-4'>
                    <li><NavLink>Book a parcel</NavLink></li>
                    <li><NavLink>My Parcels</NavLink></li>
                    <li><NavLink>My Profile</NavLink></li>
                    <li><NavLink>My Delivery List</NavLink></li>
                    <li><NavLink>My Reviews</NavLink></li>
                    <li><NavLink>All Parcels</NavLink></li>
                    <li><NavLink>All Users</NavLink></li>
                    <li><NavLink>All Delivery Men</NavLink></li>
                    <li><NavLink>Statistics</NavLink></li>
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