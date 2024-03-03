import { useContext } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const MyProfile = () => {
    const  axiosPublic = useAxiosPublic()
    const {user} = useContext(AuthContext)

    const { data }= useQuery({
        queryKey:[user?.email],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/users/${user.email}`)
            console.log(res.data);
            return res.data;
        }
    })
   
    return (
        <div className="ml-10">
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="avatar text-center px-10 pt-10">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={data[0]?.photo} alt="Shoes" className="rounded-xl" />
               </div>
                    
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{data[0]?.name}</h2>
                    <p> {data[0]?.email}</p>
                    <div className="card-actions">
                        <Link to={`/dashboard/updateUser/${data[0]?._id}`}>
                        <button className="btn btn-primary">Update Profile</button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default MyProfile;