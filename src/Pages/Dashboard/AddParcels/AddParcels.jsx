import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddParcels = () => {

    const {user} = useContext(AuthContext);
    const { register, handleSubmit,formState: { errors } } = useForm();
    const [parcelWeight, setParcelWeight]= useState(0);
    const [totalPrice, setTotalPrice]= useState(0);
    const axiosPublic = useAxiosPublic();

      useEffect(() => {
        const price = parcelWeight * 150;
        console.log("Updated totalPrice:", price);
         setTotalPrice(price);
         }, [parcelWeight]);

    const onSubmit = (data) =>{ 
        const price = parcelWeight * 150;
        
         const postData = { ...data, status: "pending", price: price };
        axiosPublic.post('/parcels', postData)
            .then(res =>{
                console.log(res.data);
                if(res.data.insertedId){
                    Swal.fire("Your Parcel Booked");
                }
            })
    }
    
    return (
        <div>
            <h2 className="text-4xl text-center">Booking Your Parcels</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* name email phone number */}
                    <div className="flex justify-around">
                        <div>
                            <label className="form-control w-full my-4">
                                <div className="label">
                                    <span className="label-text">Name</span>
                                </div>
                                <input type="text" {...register("name")} defaultValue={user?.displayName} className="input input-bordered w-full" readOnly />
                            </label>
                        </div>
                        <div>
                            <label className="form-control w-full my-4">
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <input type="email" {...register("email")} defaultValue={user?.email} className="input input-bordered w-full " readOnly />
                            </label>
                        </div>
                        <div>
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text">Phone Number</span>
                        </div>
                        <input type="text" {...register("phoneNumber",{required: true})} placeholder="Type here" className="input input-bordered w-full" />
                        { errors.phoneNumber && <span>Phone number is required</span>}
                    </label>
                    </div>
                </div>
                   {/* parcel type , weight, receiver's name */}
                <div className="flex justify-around">
                    <div>
                        <label className="form-control w-full my-4">
                            <div className="label">
                                <span className="label-text">Parcel Type</span>
                            </div>
                            <input type="text" {...register("parcelType",{required: true})} placeholder="parcel type" className="input input-bordered w-full " />
                            { errors.parcelType && <span>Parcel Type is required</span>}
                        </label>
                   </div>
                   <div>
                        <label className="form-control w-full my-4">
                            <div className="label">
                                <span className="label-text">Parcel Weight</span>
                            </div>
                            <input type="number" {...register("parcelWeight",{required: true})} 
                            placeholder="weight"
                             className="input input-bordered w-full"
                             onChange={(e) => {
                                    const newValue = parseFloat(e.target.value);
                                            if (!isNaN(newValue)) {
                                                setParcelWeight(newValue);
                                             }
                                        }}
                              />
                            { errors.parcelWeight && <span>Phone number is required</span>}
                        </label>
                   </div>
                   <div>
                   <label className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text">Reciever's Name</span>
                        </div>
                        <input type="text" {...register("receiverName",{required: true})} placeholder="receiver name" className="input input-bordered w-full" />
                        { errors.receiverName && <span>Phone number is required</span>}
                    </label>
                   </div>
                </div>
                    {/* receiver phone, delivery address, delivery date  */}
                    <div className="flex justify-around">
                        <div>
                            <label className="form-control w-full my-4">
                                <div className="label">
                                    <span className="label-text">Receiver's Phone Number</span>
                                </div>
                                <input type="number" {...register("receiverPhoneNumber",{required: true})} placeholder="Type here" className="input input-bordered w-full " />
                                { errors.receiverPhoneNumber && <span>Receiver Phone number is required</span>}
                            </label>
                        </div>
                        <div>
                            <label className="form-control w-full my-4">
                                <div className="label">
                                    <span className="label-text">Parcel Delivery Address</span>
                                </div>
                                <input type="text" {...register("deliveryAddress",{required: true})} placeholder="delivery address" className="input input-bordered w-full " />
                                { errors.deliveryAddress && <span>Delivery Address is required</span>}
                            </label>
                        </div>
                        <div>
                            <label className="form-control w-full my-4">
                                <div className="label">
                                    <span className="label-text">Requested Delivery Date</span>
                                </div>
                                <input type="date" {...register("requestedDeliveryDate",{required: true})} placeholder="date" className="input input-bordered w-full " />
                            </label>
                        </div>
                    </div>
                    {/* delivery address latitude, longitude, price */}
                <div className="flex justify-around">
                    <div>
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text">Delivery Address Latitude</span>
                        </div>
                        <input type="text" {...register("deliveryAddressLatitude",{required: true})} placeholder="delivery address latitude" className="input input-bordered w-full " />
                    </label>
                    </div>
                    <div>
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text">Delivery Address Longitude</span>
                        </div>
                        <input type="text" {...register("deliveryAddressLongitude",{required: true})} placeholder="Type here" className="input input-bordered w-full " />
                    </label>
                    </div>
                    <div>
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text">Price</span>
                        </div>
                        <input type="number" {...register("price",{required: true})} value={totalPrice} className="input input-bordered w-full " readOnly/>
                    </label>
                    </div>
                </div> 
                    <div className="text-center"> <button className="btn btn-secondary w-1/2 " type="submit">Book Parcel</button></div>  
                </form>
            </div>
        </div>
    );
};

export default AddParcels;