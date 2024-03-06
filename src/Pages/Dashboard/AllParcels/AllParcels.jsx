import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FcManager } from "react-icons/fc";
import { useState } from "react";

const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedDeliveryMenId, setSelectedDeliveryMenId]=useState(null)
    const [selectedParcelId, setSelectedParcelId]= useState(null)

    // const [allParcels, setAllParcels] = useState();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/parcels');
            // console.log(res.data)
            // setAllParcels(res.data)
            return res.data;
        }
    })
    const axiosSecure2 = useAxiosSecure();
    const { data: deliveryMen=[] } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async ()=>{
            const res = await axiosSecure2.get('/deliveryMen');
            console.log('delivery men in all parcels page ',res.data)
            return res.data;
        }
    })

    
    const handleAssignDeliveryMen= async(e)=>{
        e.preventDefault();
        const data={
          parcelId: selectedParcelId,
          deliveryMenId: selectedDeliveryMenId
        }
        const res = await axiosSecure.patch('/parcels-update',data)

        if(res.data.modifiedCount>0){
          alert('Delivery Man Assigned');
        }
        
    }



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
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.bookingDate}</td>
              <td>{item.requestedDeliveryDate}</td>
              <td>{item.price}</td>
              <td>{item.status}</td>
              <td className="text-3xl">
              <button className="btn" onClick={()=>{
                setSelectedParcelId(item._id);
                document.getElementById('manage_modal').showModal()}}>Manage<FcManager /></button>
              </td>
            </tr>
              ))
            }
          </tbody>
        </table>
        <dialog id="manage_modal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Assign A DeliveryMen</span>
  </div>
  <select className="select select-bordered" value={selectedDeliveryMenId ?? ''} onChange={function(e){setSelectedDeliveryMenId(e.target.value)}}>
    { deliveryMen &&
      deliveryMen.map((item,index)=>(
        <option key={index} value={item._id}>{item.name}</option>
      ))
    }
  </select>
  <button onClick={handleAssignDeliveryMen} className="btn">Assign Delivery Men</button>

</label>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>  
    </div>
  </div>
</dialog>
      </div>
    );
};

export default AllParcels;