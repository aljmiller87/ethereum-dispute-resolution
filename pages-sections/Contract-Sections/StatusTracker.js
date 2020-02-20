import React, { useState, useEffect } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Contract Config
import {
  EscrowState,
  EscrowSteps,
  DisputeState,
  DisputeSteps
} from "components/config/contract.js";

// Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const StatusTracker = ({ details, ActiveStep }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const isDispute = details.escrowState === "IN_DISPUTE";

  const findStatusIndex = (array, status) =>
    array.findIndex(state => state === status);

  let steps = isDispute
    ? DisputeState.map((state, index) => {
        const step = { ...DisputeSteps[state] };
        return step;
      })
    : EscrowState.map((state, index) => {
        const step = { ...EscrowSteps[state] };
        return step;
      });

  if (activeStep <= 3 && !isDispute) {
    steps = steps.slice(0, 4);
  }

  if (activeStep === 4 && !isDispute) {
    steps.splice(3, 1);
    steps.splice(4, 1);
  }

  useEffect(() => {
    if (isDispute) {
      const index = findStatusIndex(DisputeState, details.disputeState);
      setActiveStep(index);
    } else {
      const index = findStatusIndex(EscrowState, details.escrowState);
      setActiveStep(index);
    }
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
            <Step key={EscrowState[index]}>
              <StepLabel {...labelProps}>{label.name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default StatusTracker;
