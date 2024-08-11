import axios from "axios";
import { useEffect, useState } from "react";

const TopDeliveryMen = () => {
    // const [topDeliveryMen, setTopDeliveryMen] = useState([]);

    // useEffect(() => {
    //     const fetchTopDeliveryMen = async () => {
    //         try {
    //             const response = await axios.get('/topDeliveryMen');
    //             setTopDeliveryMen(response.data);
    //             console.log(response.data)
    //         } catch (error) {
    //             console.error('Failed to fetch top delivery men', error);
    //         }
    //     };

    //     fetchTopDeliveryMen();
    // }, []);
    return (
        <div>
            <h2 className="text-3xl text-center my-10">Top Delivery Men</h2>

        </div>
    );
};

export default TopDeliveryMen;