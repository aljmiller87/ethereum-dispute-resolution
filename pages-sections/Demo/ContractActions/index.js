import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// Kit Components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Grid from "@material-ui/core/Grid";

// Sections
import AwaitingPayment from "pages-sections/Demo/ContractActions/AwaitingPayment.js";
import AwaitingProductSent from "pages-sections/Demo/ContractActions/AwaitingProductSent.js";
import AwaitingDelivery from "pages-sections/Demo/ContractActions/AwaitingDelivery.js";

// Contract Config
import {
  EscrowState,
  EscrowSteps,
  DisputeState,
  DisputeSteps,
} from "components/config/contract.js";

// Styles
import styles from "assets/jss/sections/ContractActions.js";
const useStyles = makeStyles(styles);

const ContractActions = ({
  activeEscrowState,
  activeDisputeStep,
  dispatchAction,
  ...rest
}) => {
  const classes = useStyles({ ...rest });
  const escrowStep = EscrowSteps[EscrowState[activeEscrowState]];

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={4}>
        <div>
          <h3>{escrowStep.name}</h3>
          {escrowStep.description}
          {activeEscrowState === 5 && (
            <Button
              primary
              color="primary"
              size="lg"
              block={true}
              onClick={() => dispatchAction("reset", "")}
            >
              Click to reset contract
            </Button>
          )}
        </div>
      </Grid>
      {activeEscrowState === 0 && (
        <AwaitingPayment classes={classes} dispatchAction={dispatchAction} />
      )}
      {activeEscrowState === 1 && (
        <AwaitingProductSent
          classes={classes}
          dispatchAction={dispatchAction}
        />
      )}
      {activeEscrowState === 2 && (
        <AwaitingDelivery classes={classes} dispatchAction={dispatchAction} />
      )}
    </Grid>
  );
};

export default ContractActions;
