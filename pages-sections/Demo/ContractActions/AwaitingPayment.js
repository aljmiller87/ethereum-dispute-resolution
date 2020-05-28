import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";

// Kit Components
import Button from "components/nextjs-material-kit/CustomButtons/Button.js";
import Card from "components/nextjs-material-kit/Card/Card.js";
import CardBody from "components/nextjs-material-kit/Card/CardBody.js";
import CardHeader from "components/nextjs-material-kit/Card/CardHeader.js";
import CustomInput from "components/nextjs-material-kit/CustomInput/CustomInput.js";

const AwaitingPayment = ({ classes, dispatchAction }) => {
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader color="primary" className={classes.cardHeader}>
            <h4>Buyer Actions</h4>
            <div className={classes.socialLine}>
              <p>Actions only Buyer can perform</p>
            </div>
          </CardHeader>
          <CardBody>
            <h4>Confirm Payment</h4>
            <CustomInput
              labelText="Confirm Payment"
              id="ether"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                required: true,
                type: "number",
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="fab fa-ethereum" />
                  </InputAdornment>
                ),
                autoComplete: "off",
              }}
            />
            <Button
              simple
              color="primary"
              size="lg"
              block={true}
              onClick={() => dispatchAction("confirmPayment", "buyer")}
            >
              Click to Send Payment to contract
            </Button>
          </CardBody>
          <CardBody>
            <h4>Abort</h4>
            <p>
              Aborting contract updates contract status to "Cancelled" and
              prevents funds from being sent to contract
            </p>
            <Button
              simple
              color="danger"
              size="lg"
              block={true}
              onClick={() => dispatchAction("abort", "buyer")}
            >
              Click to Abort
            </Button>
          </CardBody>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader color="info" className={classes.cardHeader}>
            <h4>Seller Actions</h4>
            <div className={classes.socialLine}>
              <p>Actions only Seller can perform</p>
            </div>
          </CardHeader>
          <CardBody>
            <h4>Abort</h4>
            <p>
              Aborting contract updates contract status to "Cancelled" and
              prevents funds from being sent to contract
            </p>
            <Button
              simple
              color="danger"
              size="lg"
              block={true}
              onClick={() => dispatchAction("abort", "seller")}
            >
              Click to Abort
            </Button>
          </CardBody>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default AwaitingPayment;
