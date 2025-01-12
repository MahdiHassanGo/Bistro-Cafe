import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        console.log(totalPrice);
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                  
                })
                .catch(error => {
                    console.error("Error creating payment intent:", error);
                    setError("Failed to initialize payment. Please try again later.");
                });
                
        }
    }, [axiosSecure, totalPrice]);
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentError) {
            console.log('Payment error:', paymentError);
            setError(paymentError.message);
            return;
        } else {
            console.log('Payment method:', paymentMethod);
            setError(''); // Reset error
        }

        // Confirm card payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('Confirmation error:', confirmError);
            if (confirmError.type === 'api_connection_error') {
                setError("Network error. Please try again later.");
            } else if (confirmError.type === 'invalid_request_error') {
                setError("Invalid request. Please check your payment details.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } else {
            console.log('Payment intent:', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction ID:', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // Now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,

                    transactionId: paymentIntent.id,
                    date: new Date(), // UTC date
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                };

                try {
                    const res = await axiosSecure.post('/payments', payment);
                    console.log('Payment saved:', res.data);
                    refetch();

                    if (res.data?.paymentResult?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Thank you for your payment!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard/paymentHistory');
                    }
                } catch (error) {
                    console.error("Error saving payment:", error);
                    setError("There was an issue saving your payment. Please try again.");
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button
                className="btn btn-sm btn-primary my-4"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay
            </button>
            {error && <p className="text-red-600">{error}</p>}
            {transactionId && <p className="text-green-600">Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
