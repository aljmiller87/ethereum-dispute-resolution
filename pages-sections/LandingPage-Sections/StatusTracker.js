import React, { useState, useEffect } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Contract Config
import { EscrowState, EscrowSteps, DisputeState, DisputeSteps } from 'components/config/contract.js';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
  const [activeStep, setActiveStep] = useState(ActiveStep);

  // const steps = EscrowState.map((step, index) => EscrowSteps.step.name).slice(0, 4);
  const steps = EscrowState.map((state, index) => {
    const step = { ...EscrowSteps[state] };
    return step;
  });
  console.log('steps', steps);

  useEffect(() => {
    setActiveStep(ActiveStep);
  }, [ActiveStep])


  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={EscrowState[activeStep]}>
            <StepLabel>{label.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default StatusTracker;