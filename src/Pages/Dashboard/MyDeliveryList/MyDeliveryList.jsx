import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyDeliveryList = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: parcels=[] } = useQuery({
        queryKey:[user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/get/parcels/deliveryMen/${user?.email}`);
            console.log(res.data);
            return res?.data;
        }
    })
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Booked UN</th>
        <th>R Name</th>
        <th>B User Phone</th>
        <th>R D Date</th>
        <th>A D Date</th>
        <th>R Address</th>
        <th>R P number</th>
        <th>View Location</th>
        <th>cancel </th>
        <th>delivery</th>
      </tr>
    </thead>
    <tbody>
      {
        parcels.map(parcel =><tr key={parcel._id}>
            <th>{parcel.name}</th>
            <td>{parcel.receiverName}</td>
            <td>{parcel.phoneNumber}</td>
            <td>{parcel.requestedDeliveryDate}</td>
            <td>{parcel.approximateDeliveryDate}</td>
            <td>{parcel.deliveryAddress}</td>
            <td>{parcel.receiverPhoneNumber}</td>
            <td>view</td>
            <td>cancel</td>
            <td>delivered</td>
          </tr> )
      }
      
    </tbody>
  </table>
</div>
            {
                parcels.map(parcel=> console.log(parcel))
            }
        </div>
    );
};

export default MyDeliveryList;