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
  DisputeSteps,
} from "components/config/contract.js";

// Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const StatusTracker = ({ ActiveStep }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  let steps = EscrowState.map((state, index) => {
    const step = { ...EscrowSteps[state] };
    return step;
  });

  if (ActiveStep <= 3) {
    steps = steps.slice(0, 4);
  }

  if (ActiveStep === 4) {
    steps.splice(3, 1);
    steps.splice(4, 1);
  }

  useEffect(() => {
    setActiveStep(ActiveStep);
  }, [ActiveStep]);

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const labelProps = {};
          // if (activeStep === index) {
          //   labelProps.active = true;
          // }
          // if (activeStep > index) {
          //   labelProps.completed = true;
          // }
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
