import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdCancel, MdOutlineReviews, MdUpdate } from "react-icons/md";
import { FaAmazonPay } from "react-icons/fa";



const MyParcels = () => {
    const { user } =useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [myParcels, setMyParcels]=useState()

    const { data } = useQuery({
        queryKey:[user?.email],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/parcels/${user.email}`);
            console.log(res.data)
            setMyParcels(res.data);
            return res.data;
        }
    })

    return (
        <div className="overflow-x-auto">
        <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Parcel Type</th>
        <th>Requested Delivery Date</th>
        <th>Approximate Delivery Date</th>
        <th>Booking Date</th>
        <th>Delivery Men ID</th>
        <th>Update</th>
        <th>Cancel</th>
        <th>Reviews</th>
        <th>Pay</th>
      </tr>
    </thead>
    <tbody>
      { myParcels &&
        myParcels.map((item,index) =><tr key={item._id}>
        <th>{index +1}</th>
        <td>{item.parcelType}</td>
        <td>{item.requestedDeliveryDate}</td>
        <td>A Delivery Date</td>
        <td>Booking Date</td>
        <td>
          Delivery man id
        </td>
        <td><MdUpdate /></td>
        <td><MdCancel /></td>
        <td><MdOutlineReviews /></td>
        <td><FaAmazonPay /></td>
      </tr>
      )
      }
      
      
    </tbody>
  </table>
</div>
    );
};

export default MyParcels;