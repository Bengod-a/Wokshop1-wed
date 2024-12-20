import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../stripe.css";
import { saveOrder } from "../api/User";
import useEcomStore from "../store/ecom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const token = useEcomStore((s) => s.token);
  const clearCart = useEcomStore((s)=> s.clearCart)

  const navigate = useNavigate()

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      //   confirmParams: {
      //     // Make sure to change this to your payment completion page
      //     return_url: "https://wokshop1.vercel.app/complete",
      //   },
      redirect: "if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    console.log('p', payload);
    if (payload.error) {
        setMessage(payload.error.message);
        console.log('Error');
        toast.error(payload.error.message)
      } else if (payload.paymentIntent.status === "succeeded")  {
        console.log("Ready or Sveorder");

        saveOrder(token, { paymentIntent: payload.paymentIntent })
          .then((res) => {
            console.log(res);
            clearCart()
            toast.success('ชำระเงินสำเร็จ')
            navigate('/user/history')
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log("Something wormg!!!");
        toast.success('ชำระเงินไม่สำเร็จ')
      }
      

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <>
      <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="stripe-button"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}