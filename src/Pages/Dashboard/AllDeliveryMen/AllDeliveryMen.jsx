import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const AllDeliveryMen = () => {
const axiosSecure = useAxiosSecure();

  const { data: deliveryMen=[] } = useQuery({
    queryKey:['deliveryMen'],
    queryFn: async()=>{
        const res = await axiosSecure.get('/deliveryMen')
        console.log(res.data)
        return res.data;
    }
})
    return (
        <div>
            <h2 className='text-center'>Delivery Men</h2>
            <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Delivery Men Name</th>
                <th>Phone Number</th>
                <th>Number of Parcel Delivered</th>
                <th>Average Review</th>
              </tr>
            </thead>
            <tbody>
              {
                deliveryMen.map(user =><tr className="bg-base-200" key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.parcelCount}</td>
                    <td>{user.averageReview}</td>  
                  </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllDeliveryMen;