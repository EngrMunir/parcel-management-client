import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { MdOutlineCancelPresentation, MdOutlineDeleteOutline, MdOutlinePayments, MdOutlineRateReview } from "react-icons/md";
import Swal from "sweetalert2";

const MyParcels = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: myParcels=[], refetch } = useQuery({
        queryKey:['parcels'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/bookParcel?email=${user.email}`)
            return res.data;
        }
    })

    const handleCancel=async(id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          const cancelInfo = {
            parcelId: id,
            status:'cancelled'
          }
          const res = await axiosSecure.patch('/bookParcel/cancel',cancelInfo)
          if(res.data.modifiedCount){
            refetch()
            Swal.fire({
              title: "Cancelled!",
              text: "Your file has been canceled.",
              icon: "success"
            });
          }
        }
      });
    }
    return (
        <div>
            <h2 className="text-3xl text-center">My Parcels:{myParcels?.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Parcel Type</th>
        <th>Requested <br /> Delivery Date</th>
        <th>Approximate <br /> Delivery Date</th>
        <th>Booking Date</th>
        <th>Delivery Men Id</th>
        <th>Status</th>
        <th>Update</th>
        <th>Cancel</th>
        <th>Review</th>
        <th>Pay</th>
      </tr>
    </thead>
    <tbody>
      {
        myParcels.map(parcel =><tr className="bg-base-200" key={parcel._id}>
            <th>{parcel.parcelType}</th>
            <td>{parcel.requestedDeliveryDate}</td>
            <td>Quality Control</td>
            <td>{parcel.bookingDate}</td>
            <th>1</th>
            <td>{parcel.status}</td>
            <th><FaEdit className="text-3xl text-blue-500" /></th>
            <td><button onClick={()=>handleCancel(parcel._id)}><MdOutlineCancelPresentation className="text-3xl text-red-500"/> </button></td>
            <td><MdOutlineRateReview className="text-3xl text-blue-500"/> </td>
            <td><MdOutlinePayments className="text-3xl text-blue-500"/></td>  
          </tr>)
    }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyParcels;