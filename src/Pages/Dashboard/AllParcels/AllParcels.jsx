import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
    // const [allParcels, setAllParcels] = useState();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/parcels');
            console.log(res.data)
            // setAllParcels(res.data)
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
                <th>Owner</th>
                <th>Phone</th>
                <th>Booking Date</th>
                <th>Requested D_Date</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Manage Button</th>
            </tr>
          </thead>
          <tbody>
            { 
              parcels.map((item, index)=>(
                <tr key={index}>
              <th>{index+1}</th>
              <td>owner</td>
              <td>{item.phoneNumber}</td>
              <td>Blue</td>
              <td>{item.requestedDeliveryDate}</td>
              <td>{item.price}</td>
              <td>{item.status}</td>
              <td>Manage Button</td>
            </tr>
              ))
            }
            
            
          </tbody>
        </table>
      </div>
    );
};

export default AllParcels;