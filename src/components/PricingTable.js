import React from "react";
import { PricingTable, PricingSlot, PricingDetail } from "react-pricing-table";
import "./PricingTable.css";

export default function PricingTableComponent(props) {
  async function goToSignup() {
    props.history.push("/signup");
  }

  function openCalendlyScheduling() {
    window.open("https://calendly.com/richstone/intro", "_blank");
  }

  return (
    <PricingTable highlightColor="#5bc0de">
      <PricingSlot
        onClick={goToSignup}
        buttonText="REGISTER"
        title="FREE"
        priceText="$0"
        className="btn btn-info"
      >
        <PricingDetail> Explore our Work in Progress </PricingDetail>
      </PricingSlot>

      <PricingSlot
        highlighted
        onClick={openCalendlyScheduling}
        buttonText="FREE DEMO"
        title="NUMIS PRO"
        priceText={`Pre-order: $99/month`}
      >
        <PricingDetail>
          {" "}
          <b>Your inventory in 1 place</b>
        </PricingDetail>
        <PricingDetail>
          {" "}
          <b>Unlimited products</b> storage
        </PricingDetail>
        <PricingDetail>
          {" "}
          <b>Integrate</b> ma-shops and eBay
        </PricingDetail>
        <PricingDetail>
          {" "}
          <b>
            Coming November 2020 <del>(300$/month)</del>
          </b>
        </PricingDetail>
      </PricingSlot>
      <PricingSlot
        onClick={openCalendlyScheduling}
        buttonText="FREE CALL"
        title="CUSTOM SOLUTIONS"
        priceText="Let's talk"
      >
        <PricingDetail> Quick Proposal</PricingDetail>
        <PricingDetail> Personalized Solutions</PricingDetail>
        <PricingDetail>
          {" "}
          We <b>set up</b> your shop
        </PricingDetail>
        <PricingDetail>
          {" "}
          We <b>Integrate</b> your existing systems
        </PricingDetail>
      </PricingSlot>
    </PricingTable>
  );
}
