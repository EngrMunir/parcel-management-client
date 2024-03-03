import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FcManager } from "react-icons/fc";

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
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.bookingDate}</td>
              <td>{item.requestedDeliveryDate}</td>
              <td>{item.price}</td>
              <td>{item.status}</td>
              <td className="text-3xl">
              <button className="btn" onClick={()=>document.getElementById('manage_modal').showModal()}><FcManager /></button>
              </td>
            </tr>
              ))
            }

          </tbody>
        </table>
        <dialog id="manage_modal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
      </div>
    );
};

export default AllParcels;