import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const AllDeliveryMen = () => {
    const axiosSecure = useAxiosSecure();
    const { data: deliveryMen = [] } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/users/deliveryMen');
            console.log(res.data)
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
        <th>Delivery Man</th>
        <th>Phone Number</th>
        <th>Delivered Parcel Number</th>
        <th>Average Review</th>
      </tr>
    </thead>
    <tbody>
      {
        deliveryMen.map((item, index) =><tr key={item._id}>
            <th>{index+1}</th>
            <td>{item.name}</td>
            <td>{item._id}</td>
            <td>Blue</td>
            <td>Blue</td>
          </tr>
          )
      }
      
    </tbody>
  </table>
</div>
    );
};

export default AllDeliveryMen;