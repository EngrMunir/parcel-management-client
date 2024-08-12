import React from 'react';
import img1 from '../../../assets/map.jpg';
import img2 from '../../../assets/truck.jpg';
import img3 from '../../../assets/security.png';


const Feature = () => {
    return (
        <div>
            <div className='text-center'>
                <h2 className='text-3xl font-bold'>Our Feature</h2>
                <p>Innovative Solutions for Seamless Delivery</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {/* card 1 */}
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img
                    src={img3}
                    alt="Shoes"
                    className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Ensured Parcel Safety</h2>
                    <p>Your parcels are our priority. With our secure handling and tracking system, you can rest assured that your items are in safe hands, from pickup to delivery.</p>
                </div>
            </div>
            {/* card 2 */}
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img
                    src={img2}
                    alt="Shoes"
                    className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Super Fast Delivery</h2>
                    <p>Get your parcels delivered at lightning speed. Our dedicated delivery team ensures that your packages reach their destination on time, every time.</p>
                </div>
            </div>
            {/* card 3' */}
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img
                    src={img1}
                    alt="Shoes"
                    className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Real-Time Tracking</h2>
                    <p>Stay informed with real-time tracking of your parcel. Know exactly where your package is, with updates available at every step of the delivery process.</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Feature;