import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdCancel, MdOutlineReviews, MdUpdate } from "react-icons/md";
import { FaAmazonPay } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



const MyParcels = () => {
    const { user,setPaymentPrice, setPaidId } =useContext(AuthContext);
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
    const handleCancel= async(parcelId)=>{
      const result= await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })

        if (result.isConfirmed) {
          const res = await axiosPublic.patch(`/parcels/${parcelId}/cancel`,{status: 'cancelled'})
          console.log(res.data);
          // Swal.fire({
          //   title: "Deleted!",
          //   text: "Your file has been deleted.",
          //   icon: "success"
          // });
        }
      
    }

    const handlePayment =(newPrice, id)=>{
      console.log('price and id for context api',newPrice, id)
      setPaymentPrice(newPrice)
      setPaidId(id)
    }
   
    return (
        <div className="overflow-x-auto">
        <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Parcel Type</th>
        <th>R D Date</th>
        <th>A D Date</th>
        <th>B Date</th>
        <th>D Men ID</th>
        <th>Status</th>
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
        <td>A Delivery </td>
        <td>{item.bookingDate}</td>
        <td>
          Delivery Id
        </td>
        <td>{item.status}</td>
        <td>
          <Link to={`/dashboard/updateParcel/${item._id}`}>
            <button className="btn btn-ghost btn-lg bg-orange-500">
            <MdUpdate />
            {item._id}
            </button>
          </Link>
        </td>
        <td className="text-2xl">
          { item.status ==='pending'?
            <button onClick={()=>handleCancel(item._id)}><MdCancel /></button>
            :
            <button disabled><MdCancel /></button>
          }
        </td>
        <td className="text-2xl"><MdOutlineReviews /></td>
       
        <td>
        
          { myParcels.length && item.status!=='cancelled' ?

            <Link to={"/dashboard/payment"}>
            <button onClick={()=>handlePayment(item.price,item._id)} className="btn btn-primary"><FaAmazonPay /></button>
          </Link>
          :
          <button disabled className="btn btn-primary"><FaAmazonPay /></button>

          }
        </td>
      </tr>
      )
      }            
    </tbody>
  </table>
</div>
    );
};

export default MyParcels;