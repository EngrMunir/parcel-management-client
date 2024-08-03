import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

// TODO:add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const location = useLocation();
    const { parcel } = location.state;

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm parcel={parcel}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;