import React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";

export default function CheckOutStatus({ activeStep = 0 }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {["Login", "Shipping Address", "Payment", "Place Order"].map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
