import React, { useState } from "react";
import { API } from "aws-amplify";
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../components/BillingForm";
import config from "../config";
import "./Settings.css";

export default function Settings(props) {
  const [isLoading, setIsLoading] = useState(false);

  function billUser(details) {
    return API.post("products", "/billing", {
      body: details,
    });
  }

  async function handleFormSubmit(storage, { token, error }) {
    if (error) {
      alert(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token.id,
      });

      alert("Your card has been charged successfully!");
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Settings">
      <h2>Welcome, Numismat!</h2>

      <h3>Your Categories</h3>

      <h3>Your ebay token</h3>

      <h3>Your Details</h3>

      <StripeProvider apiKey={config.STRIPE_KEY}>
        <Elements>
          <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
        </Elements>
      </StripeProvider>
    </div>
  );
}
