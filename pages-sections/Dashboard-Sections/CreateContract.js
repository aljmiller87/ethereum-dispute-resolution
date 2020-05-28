import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import * as accountActions from "../../redux/actions/accountActions";

// Material components
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Modal from "@material-ui/core/Modal";
import People from "@material-ui/icons/People";

// Kit core components
import Card from "components/nextjs-material-kit/Card/Card.js";
import CardBody from "components/nextjs-material-kit/Card/CardBody.js";
import CardHeader from "components/nextjs-material-kit/Card/CardHeader.js";
import CardFooter from "components/nextjs-material-kit/Card/CardFooter.js";

import CustomInput from "components/nextjs-material-kit/CustomInput/CustomInput.js";

// Ethereum
import factory from "../../ethereum/factory";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  modal: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    margin: "1rem 0",
    width: "100%",
    "& select": {
      "&:disabled": {
        cursor: "not-allowed",
        pointerEvents: "all",
      },
    },
  },
}));

const ContractNew = (props) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { account: coinbase } = useSelector((state) => state.accountReducer);
  const [isRoleChosen, setIsRoleChosen] = useState(false);
  const [isBuyer, setIsBuyer] = useState();
  const [buyerAddress, setBuyerAddress] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [contractValue, setContractValue] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();

  console.log("coinbase", coinbase);

  const setOtherValue = (e) => {
    if (!e.target || !e.target.value || !isRoleChosen) {
      return null;
    }
    if (isBuyer) {
      setBuyerAddress(coinbase);
      setSellerAddress(e.target.value);
    } else {
      setBuyerAddress(e.target.value);
      setSellerAddress(coinbase);
    }
  };

  const setEtherValue = (e) => {
    if (!e.target || !e.target.value) {
      return null;
    }
    setContractValue(e.target.value);
  };

  const resetForm = () => {
    setIsRoleChosen(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleBuyerSellerSelect = (event) => {
    const target = event.target;
    if (target.value === "none") {
      setIsRoleChosen(false);
      return;
    }
    setIsBuyer(target.value == "buyer" ? true : false);
    setIsRoleChosen(true);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(!isLoading);
    try {
      await factory.methods
        .createContract(
          `${isBuyer ? sellerAddress : buyerAddress}`,
          `${isBuyer}`
        )
        .send({
          from: buyerAddress,
          gas: "5000000",
        }) // Wait for transaction to confirm
        .on("confirmation", async (confirmationNumber, receipt) => {
          // If first confirmation...
          console.log("confirmationNumber", confirmationNumber);
          if (confirmationNumber === 1) {
            console.log("contract created", receipt);
            dispatch(accountActions.asyncLoadAccountInfo());
            setLoading(false);
          }
        });
    } catch (err) {
      alert(err.message);
      setErrorMessage(err.message);
      setLoading(false);
    }
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
                id: "buyer-seller-placeholder",
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
                fullWidth: true,
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
                ),
              }}
            />
          )}
          {/* {isRoleChosen && isBuyer && (
            <CustomInput
              labelText="Contract Value (in Ether)"
              id="ether"
              value={contractValue}
              formControlProps={{
                fullWidth: true,
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
                autoComplete: "off",
              }}
            />
          )} */}
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button onClick={handleClick} disabled={isLoading}>
            Get started
          </Button>
          <Button onClick={resetForm}>Reset</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContractNew;
