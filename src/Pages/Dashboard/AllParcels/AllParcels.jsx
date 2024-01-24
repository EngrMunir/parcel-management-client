import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
    const [allParcels, setAllParcels] = useState();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/parcels');
            console.log(res.data)
            setAllParcels(res.data)
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
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    );
};

export default AllParcels;