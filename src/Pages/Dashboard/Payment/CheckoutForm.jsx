import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const CheckoutForm = () => {
    const [error, setError]= useState('')
    const [clientSecret, setClientSecret]= useState('');
    const [transactionId, setTransactionId]= useState('');
    const {user} = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {price, productId} = useContext(AuthContext); 

    console.log('product id in checkout form ',productId)

    // console.log('received price in checkout page ', price);


   useEffect(()=>{
    axiosSecure.post('/create-payment-intent',{price: price})
    .then(res =>{
      console.log('client secret ',res.data.clientSecret)
      setClientSecret(res.data.clientSecret)
    })
   },[axiosSecure, price])


    const handleSubmit = async(event) =>{
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);

        if(card === null){
            return;
        }
        const {error, paymentMethod }= await stripe.createPaymentMethod({
            type:'card',
            card
        })
        if(error){
            console.log('payment error ', error)
            setError(error.message);
        }
        else{
            console.log('payment method ', paymentMethod)
            setError('');
        }
        // confirm payment
        const {paymentIntent, error:confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method:{
            card: card,
            billing_details:{
              email: user?.email || 'annonymous',
              name: user?.displayName || 'annonymous',
            }
          }
        })
        if(confirmError){
          console.log('confirm error')
        }
        else{
          console.log('payment intent ', paymentIntent)
          if(paymentIntent.status === 'succeeded'){
            console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id)
            // now save the payment in the database
            const payment = {
              email: user.email,
              price: price,
              date: new Date(), //utc date convert use moment js
              menuId: productId,
              transactionId:paymentIntent.id,
              status: 'pending'
            }
           const res = await axiosSecure.post('/payments', payment)
           console.log('payment save ', res);
          }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
             <CardElement
             className="my-8 mx-8"
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
      <button className="btn btn-sm btn-primary my-4 mx-8" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {
        transactionId && <p className="text-green-600">Your transaction id :{transactionId}</p>
      }
        </form>
    );
};

export default CheckoutForm;