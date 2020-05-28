import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";

// Kit Components
import Grid from "@material-ui/core/Grid";

import Button from "components/nextjs-material-kit/CustomButtons/Button.js";
import Card from "components/nextjs-material-kit/Card/Card.js";
import CardBody from "components/nextjs-material-kit/Card/CardBody.js";
import CardHeader from "components/nextjs-material-kit/Card/CardHeader.js";
import CardFooter from "components/nextjs-material-kit/Card/CardFooter.js";
import CustomInput from "components/nextjs-material-kit/CustomInput/CustomInput.js";

// Styles
import styles from "assets/jss/sections/CreateDemoSection";

const useStyles = makeStyles(styles);

const CreateDemoSection = ({ active, callback }) => {
  const classes = useStyles({ active });

  const isFormValidated = () => {
    const etherInput = document.getElementById("ether");
    let etherValue = etherInput.value;
    if (!etherValue) {
      return false;
    }
    return etherValue;
  };
  const handleSubmitForm = () => {
    callback();
  };
  return (
    <div className={classes.demoStep} active={active}>
      <Grid container justify="center">
        <Grid item xs={12} sm={6}>
          <Card>
            <form className={classes.form}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Contract Walk Through</h4>
                <div className={classes.socialLine}>
                  <p>
                    This is a simulation of the escrow and dispute resolution
                    feature of Arbitration Distributed's contracts
                  </p>
                </div>
              </CardHeader>
              <p className={classes.divider}>
                This is for learning purposes only. This is not a real contract
                and is not connected to the Ethereum blockchain
              </p>
              <CardBody>
                <CustomInput
                  labelText="Buyer"
                  id="buyer"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    readOnly: true,
                    type: "text",
                    value: "0x00000001",
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="Seller..."
                  id="seller"
                  value="0x00000002"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    readOnly: true,
                    type: "text",
                    value: "0x00000002",
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* <CustomInput
                  labelText="Contract Value (in Ether)"
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
                /> */}
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button
                  simple
                  color="primary"
                  size="lg"
                  onClick={handleSubmitForm}
                >
                  Get started
                </Button>
              </CardFooter>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateDemoSection;
