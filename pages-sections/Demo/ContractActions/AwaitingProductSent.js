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

const AwaitingProductSent = ({ classes, dispatchAction }) => {
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
            <h4>Initiate Dispute</h4>
            <p>
              Initiating a dispute cancel's the contract normal operation and
              initiates the contract's internal dispute resolution process.
            </p>
            <Button
              simple
              color="danger"
              size="lg"
              block={true}
              onClick={() => dispatchAction("initDispute", "buyer")}
            >
              Click to Initiate a Dispute
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
            <h4>Confirm Product Sent</h4>
            <p>
              Confirm the product or services have been sent or provided to
              buyer.
            </p>
            <Button
              simple
              color="info"
              size="lg"
              block={true}
              onClick={() => dispatchAction("confirmProductSent", "seller")}
            >
              Click to Initiate a Dispute
            </Button>
          </CardBody>
          <CardBody>
            <h4>Initiate Dispute</h4>
            <p>
              Initiating a dispute cancel's the contract normal operation and
              initiates the contract's internal dispute resolution process.
            </p>
            <Button
              simple
              color="danger"
              size="lg"
              block={true}
              onClick={() => dispatchAction("initDispute", "seller")}
            >
              Click to Initiate a Dispute
            </Button>
          </CardBody>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default AwaitingProductSent;
