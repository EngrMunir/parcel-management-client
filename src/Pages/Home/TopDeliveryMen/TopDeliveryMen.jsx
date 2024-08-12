import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import DeliveryMenCard from "./DeliveryMenCard";

const TopDeliveryMen = () => {
    const axiosSecure = useAxiosSecure();

    const { data: topMen=[], refetch } = useQuery({
        queryKey:['top'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/topDeliveryMen')
            console.log(res.data)
            return res.data;
        }
    })
   
    return (
        <div className="mb-8">
            <h2 className="text-3xl text-center my-10">Top Delivery Men</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {
                    topMen.map(top => <DeliveryMenCard key={top._id} deliveryMen={top}></DeliveryMenCard> )
                }
            </div>
        </div>
    );
};

export default TopDeliveryMen;