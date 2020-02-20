import React, { useState } from "react";

// Context
import { useEthereumContext } from "../../context/ethereum";

// core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import CustomInput from "components/CustomInput/CustomInput.js";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Icon from "@material-ui/core/Icon";
import People from "@material-ui/icons/People";

// Ethereum
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const ContractNew = ({ coinbase, ...rest }) => {
  console.log("coinbase", coinbase);
  const contextData = useEthereumContext();

  const [minimumContribution, setMinimumContribution] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [contractValue, setContractValue] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const setSellerValue = e => {
    if (!e.target || !e.target.value) {
      return null;
    }
    console.log("e.target.value", e.target.value);
    setSellerAddress(e.target.value);
  };

  const setEtherValue = e => {
    if (!e.target || !e.target.value) {
      return null;
    }
    console.log("e.target.value", e.target.value);
    setContractValue(e.target.value);
  };

  const handleClick = async e => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(!loading);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createContract(`${sellerAddress}`)
        .send({
          from: coinbase,
          gas: "5000000"
        }) // Wait for transaction to confirm
        .on("confirmation", (confirmationNumber, receipt) => {
          // If first confirmation...
          if (confirmationNumber === 1)
            console.log("contract created", receipt);
          contextData.loadAccountInfo();
        });
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(!loading);
  };

  return (
    <Card>
      <form className={classes.form}>
        <CardHeader color="primary" className={classes.cardHeader}>
          <h2>Contract Creation</h2>
          <div className={classes.socialLine}>
            <h5>
              Action is for potential buyers. Sellers must be invited after
              creation.
            </h5>
          </div>
        </CardHeader>
        <CardBody>
          <CustomInput
            labelText="Buyer"
            id="buyer"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              readOnly: true,
              type: "text",
              value: coinbase,
              endAdornment: (
                <InputAdornment position="end">
                  <People className={classes.inputIconsColor} />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            labelText="Seller..."
            id="seller"
            value={sellerAddress}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: setSellerValue,
              type: "text",
              required: true,
              autoComplete: "off",
              placeholder: "0x00000002",
              endAdornment: (
                <InputAdornment position="end">
                  <People className={classes.inputIconsColor} />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            labelText="Contract Value (in Ether)"
            id="ether"
            value={contractValue}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: setEtherValue,
              required: true,
              type: "number",
              endAdornment: (
                <InputAdornment position="end">
                  {/* <SvgIcon className={classes.inputIconsColor}> */}
                  <Icon className="fab fa-ethereum" />
                  {/* </SvgIcon> */}
                </InputAdornment>
              ),
              autoComplete: "off"
            }}
          />
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button onClick={handleClick}>Get started</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContractNew;
