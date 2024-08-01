import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users=[], isLoading }= useQuery({
        queryKey:['user'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/users');
            console.log(res.data)
            return res.data;
        }
    })

    if(isLoading){
        return <p>Loading....</p>
    }

    return (
        <div>
            <h2>All Users:{users.length}</h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>User's Name</th>
                    <th>Phone Number</th>
                    <th>Number of Parcel Booked</th>
                    <th>Total Spent of Amount</th>
                    <th>Make Delivery Men</th>
                    <th>Make Admin</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map(user=>(<tr key={user._id}>
                      <th>{user.name}</th>
                      <td>{user.phone}</td>
                      <td>0</td>
                      <td>Blue</td>
                      <td>Moderator</td>
                      <td>Admin</td>
                    </tr>))
                  }
                      
                </tbody>
              </table>
            </div>
        </div>
    );
};

export default AllUsers;