import React, { useState, useRef } from "react";

// Context
import { useEthereumContext } from "../../context/ethereum";

// Material components
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

// core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import CustomInput from "components/CustomInput/CustomInput.js";

// @material-ui
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Close from "@material-ui/icons/Close";
import Icon from "@material-ui/core/Icon";
import Modal from "@material-ui/core/Modal";
import People from "@material-ui/icons/People";

// Ethereum
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  modal: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center"
  },
  formControl: {
    margin: "1rem 0",
    width: "100%",
    "& select": {
      "&:disabled": {
        cursor: "not-allowed",
        pointerEvents: "all"
      }
    }
  }
}));

const ContractNew = ({ coinbase, ...rest }) => {
  console.log("coinbase", coinbase);
  const contextData = useEthereumContext();
  const formRef = useRef();
  const [isRoleChosen, setIsRoleChosen] = useState(false);
  const [isBuyer, setIsBuyer] = useState();
  const [buyerAddress, setBuyerAddress] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [contractValue, setContractValue] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();

  console.log("isBuyer", isBuyer);
  console.log("buyerAddress", buyerAddress);
  console.log("sellerAddress", sellerAddress);
  console.log("contractValue", contractValue);

  const setOtherValue = e => {
    if (!e.target || !e.target.value || !isRoleChosen) {
      return null;
    }
    console.log("e.target.value", e.target.value);
    if (isBuyer) {
      setBuyerAddress(coinbase);
      setSellerAddress(e.target.value);
    } else {
      setBuyerAddress(e.target.value);
      setSellerAddress(coinbase);
    }
  };

  const setEtherValue = e => {
    if (!e.target || !e.target.value) {
      return null;
    }
    console.log("e.target.value", e.target.value);
    setContractValue(e.target.value);
  };

  const resetForm = () => {
    setIsRoleChosen(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleBuyerSellerSelect = event => {
    const target = event.target;
    if (target.value === "none") {
      setIsRoleChosen(false);
      return;
    }
    setIsBuyer(target.value == "buyer" ? true : false);
    setIsRoleChosen(true);
  };

  const handleClick = async e => {
    e.preventDefault();
    console.log("coinbase", coinbase);
    console.log("buyerAddress", buyerAddress);
    console.log("sellerAddress", sellerAddress);
    console.log(
      "contract Value",
      web3.utils.toWei(`${contractValue}`, "ether")
    );
    setErrorMessage("");
    setLoading(!isLoading);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createContract(`${buyerAddress}`, `${sellerAddress}`)
        .send({
          from: coinbase,
          gas: "5000000",
          value: web3.utils.toWei(`${contractValue}`, "ether")
        }) // Wait for transaction to confirm
        .on("confirmation", (confirmationNumber, receipt) => {
          // If first confirmation...
          if (confirmationNumber === 1)
            console.log("contract created", receipt);
          contextData.loadAccountInfo();
        });
    } catch (err) {
      alert(err.message);
      setErrorMessage(err.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleBackdropClick = () => null;

  if (isLoading) {
    return (
      <Modal
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isLoading}
      >
        <CircularProgress style={{ color: "white" }} />
      </Modal>
    );
  }

  return (
    <Card>
      <CircularProgress />
      <form ref={formRef} className={classes.form}>
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
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="buyer-seller-label-placeholder">
              Buyer/Seller
            </InputLabel>
            <NativeSelect
              disabled={isRoleChosen}
              onChange={handleBuyerSellerSelect}
              inputProps={{
                name: "Buyer/Seller",
                id: "buyer-seller-placeholder"
              }}
            >
              <option value="none">Choose Role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </NativeSelect>
            <FormHelperText>
              Is your role the buyer or seller of a good or service?
            </FormHelperText>
          </FormControl>

          {isRoleChosen && (
            <CustomInput
              labelText={
                isBuyer ? "Enter Seller Address..." : "Enter Buyer Address..."
              }
              // ref={addressRef}
              id="address"
              value={isBuyer ? sellerAddress : buyerAddress}
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: setOtherValue,
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
          )}
          {isRoleChosen && isBuyer && (
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
                    <Icon className="fab fa-ethereum" />
                  </InputAdornment>
                ),
                autoComplete: "off"
              }}
            />
          )}
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button onClick={handleClick}>Get started</Button>
          <Button onClick={resetForm}>Reset</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContractNew;
