import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import useAuth from '../../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import { MdManageAccounts } from 'react-icons/md';

const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: allParcels=[], refetch } = useQuery({
        queryKey:['parcels'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/bookParcel')
            console.log(res.data)
            return res.data;
        }
    })
    return (
        <div>
            <h2 className='text-3xl text-center'>All Parcel</h2>
            <div className="overflow-x-auto">
                <table className="table">
                {/* head */}
                    <thead>
                        <tr>
                            <th>Sender Name</th>
                            <th>Sender Phone</th>
                            <th>Booking Date</th>
                            <th>Requested <br /> Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Manage Button</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                    allParcels.map(parcel =>
                        (
                            <tr key={parcel._id}>
                            <th>{parcel.name}</th>
                            <td>{parcel.phone}</td>
                            <td>{parcel.bookingDate}</td>
                            <td>{parcel.requestedDeliveryDate}</td>
                            <td>{parcel.price}</td>
                            <td>{parcel.status}</td>
                            <td><button className='btn text-slate-400'><MdManageAccounts  className='text-3xl'/></button></td>
                        </tr>
                        )
                    ) }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllParcels;