import React, { useState, useEffect } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

// Contract Config
import {
  EscrowState,
  EscrowSteps,
  DisputeState,
  DisputeSteps,
} from "components/config/contract.js";

const StatusTracker = ({ details, ActiveStep }) => {
  const [activeStep, setActiveStep] = useState(0);
  const isDispute = details.escrowState === "IN_DISPUTE";

  const enumState = isDispute ? DisputeState : EscrowState;

  const findStatusIndex = (array, status) =>
    array.findIndex((state) => state === status);

  let steps = isDispute
    ? DisputeState.map((state, index) => {
        const step = { ...DisputeSteps[state] };
        return step;
      })
    : EscrowState.map((state, index) => {
        const step = { ...EscrowSteps[state] };
        return step;
      });

  if (!isDispute) {
    steps.splice(3, 2);
  }

  useEffect(() => {
    const index = isDispute
      ? findStatusIndex(DisputeState, details.disputeState)
      : findStatusIndex(EscrowState, details.escrowState);
    setActiveStep(index);
  }, [details]);

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const labelProps = {};
          if (activeStep === 4 && index === 3) {
            labelProps.error = true;
          }
          return (
            <Step key={enumState[index]}>
              <StepLabel {...labelProps}>{label.name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default StatusTracker;
