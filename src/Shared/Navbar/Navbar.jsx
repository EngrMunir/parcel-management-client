import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // console.log('user in navbar ', user)
    // const name = user?.displayName; 
    // console.log('user name ',name);
    const axiosPublic = useAxiosPublic();
        const { data } = useQuery({
        queryKey:[user?.email],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/users/${user?.email}`);
            // console.log(res.data[0].name)
            return res.data;
        }
    })

    // console.log('current user data is ', data);



    const handleLogOut =()=>{
        logOut()
        .then(()=>{})
        .catch(error=>{
            console.log(error);
        })
    }

    const navlinks = 
    <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/">Notification</Link></li>
        
        {
            user ? <>
            <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
            </> : 
            
            <>
            <li><Link to="/login">Login</Link></li>
            </>
        }
        
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navlinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Parcel Management</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-end">
                        <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        {data && data.length > 0 && data[0] && (
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={data[0].photo} />
                                </div>
                            )}

                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                user && data?.length> 0 && (
                                    <li>{data[0]?.name}</li>
                                )
                               
                            }
                            <li><a>Dashboard</a></li>
                            <button onClick={handleLogOut} className="btn btn-primary">Logout</button>
                        </ul>
                     </div>
            </div>
        </div>
    );
};

export default Navbar;