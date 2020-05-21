import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import People from "@material-ui/icons/People";

// Kit Components
import ContractActions from "pages-sections/LandingPage-Sections/ContractActions";
import Grid from "@material-ui/core/Grid";

import StatusTracker from "pages-sections/LandingPage-Sections/StatusTracker.js";

// Styles
import styles from "assets/jss/sections/CreateDemoSection";

// Contract Config
import {
  EscrowState,
  EscrowSteps,
  DisputeState,
  DisputeSteps,
} from "components/config/contract.js";

const useStyles = makeStyles(styles);

const ActiveDemoSection = ({ active, callback }) => {
  const classes = useStyles({ active });
  const [escrowState, setEscrowState] = useState(0);
  const [disputeStep, setDisputeStep] = useState(0);
  console.log("ActiveDemoSection escrowState int", escrowState);

  const escrowStep = EscrowSteps[EscrowState[escrowState]];

  const findNextState = (action) => {
    return escrowStep.actions[action].nextState;
  };

  const dispatchAction = (action, user) => {
    if (action === "reset") {
      setEscrowState(0);
      return;
    }
    const nextState = findNextState(action);
    const nextStateIndex = EscrowState.findIndex(
      (state) => state === nextState
    );
    setEscrowState(nextStateIndex);
  };

  return (
    <div className={classes.demoStep} active={active}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <StatusTracker ActiveStep={escrowState} />
        </Grid>
      </Grid>

      <ContractActions
        activeEscrowState={escrowState}
        activeDisputeStep={disputeStep}
        {...EscrowState}
        {...EscrowSteps}
        {...DisputeState}
        {...DisputeSteps}
        dispatchAction={dispatchAction}
      />
    </div>
  );
};

export default ActiveDemoSection;
