import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import useAuth from '../../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';

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
            <h2 className='text-3xl text-center'>All Parcels{allParcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                {/* head */}
                    <thead>
                        <tr>
                            <th>Sender Name</th>
                            <th>Sender Phone</th>
                            <th>Booking Date</th>
                            <th>Requested Delivery Date</th>
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
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
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