import { useParams } from "react-router-dom";

const UpdateUser = () => {

    const {id}=useParams();
    console.log('user id in update user page',id)
    return (
        <div>
            <h2>Update user info</h2>
        </div>
    );
};

export default UpdateUser;