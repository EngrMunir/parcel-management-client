import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hook/useAuth';
import useAxiosPublic from '../../../hook/useAxiosPublic';

// const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY;

// const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
    // const axiosPublic= useAxiosPublic();
    const { user,loading }= useAuth();
    if(loading){
        return <p>Loading......</p>
    }
    console.log(user)
    return (
        <div>
            <div className="avatar online ">
                <div className="w-24 rounded-full">
                    <img src={user.photoURL} />
                </div>
            </div>
            <h2>{user.displayName}</h2>
            <h2>{user.email}</h2>
        </div>
    );
};

export default MyProfile;