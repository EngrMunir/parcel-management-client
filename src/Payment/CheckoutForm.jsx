import { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAuth from '../hook/useAuth';
import useAxiosSecure from '../hook/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckoutForm = ({parcel}) => {
    const [error, serError]= useState('')
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId]= useState('');
    const [show, setShow]= useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {_id,  price }= parcel;
    console.log('price: ',price)

    useEffect(()=>{
        if(price >0){
            axiosSecure.post('/create-payment-intent',{price:price})
            .then(res =>{
                console.log('res intent',res)
                setClientSecret(res.data.clientSecret)
            })
        }
    },[axiosSecure, price])

    const handlePay = async(event)=>{
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type:'card',
            card,
        })
        if(error){
            console.log('payment error',error)
            serError(error.message)
        }else{
            console.log('Payment method',paymentMethod)
            serError('')
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    email:user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError){
            console.log('confirm error')
        }
        else{
            console.log('payment intent',paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id ',paymentIntent.id);
                setTransactionId(paymentIntent.id)
                // now save payment data to database
                const payment = {
                    email: user.email,
                    price: price,
                    transactionId:transactionId,
                    date: new Date(), //use moment js to convert utc
                    parcelId:_id,
                    status:'paid'
                }
                const res = await axiosSecure.post('/payments',payment);
                console.log('payment save', res);
                if(res.data?.insertedId){
                    Swal.fire('Thank You for payment')
                    .then(()=>{
                        setShow(true)
                    })
                }
            }
        }
    }

    return (
        <form onSubmit={handlePay}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" className='btn btn-sm btn-primary my-4' disabled={!stripe}>
          Pay
        </button>
        <p className='text-red-600'>{error}</p>
      </form>
    );
};

export default CheckoutForm;