import { useEffect, useState } from "react";
import TopCard from "./TopCard";

const TopDeliveryMan = () => {
    const [deliveryMen, setDeliveryMen]= useState([]);

    useEffect(()=>{
        fetch('top-delivery.json')
        .then(res => res.json())
        .then(data=>{
            // console.log(data);
            setDeliveryMen(data);
        })
        .catch(error=>console.log(error))
    },[])
    return (
        <div className="mt-10 mb-10">
            <div>
                <h2 className="text-3xl text-center">Top Delivery Man</h2>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {
                deliveryMen.map(item=><TopCard key={item._id} item={item}></TopCard>)
            }
        </div>
        </div>
    );
};

export default TopDeliveryMan;