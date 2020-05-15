import React, { useState, useRef } from "react";
import styled from "styled-components";

// Ethereum
import threeJudge from "../../../ethereum/threejudge";
import web3 from "../../../ethereum/web3";

// @material-ui/core components
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";

// Kit Components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import CustomInput from "components/CustomInput/CustomInput.js";

const ConfirmPayment = ({ action, onSuccess, contractAddress }) => {
  const etherInputRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValidated = () => {
    if (!etherInputRef || !etherInputRef.current) {
      return false;
    }
    const input = etherInputRef.current.querySelector("input");
    const etherValue = input.value;

    if (!etherValue) {
      return false;
    }
    return parseFloat(etherValue);
  };

  const toWei = (value) => {
    return web3.utils.toWei(value, "ether");
  };

  const handleSubmitForm = async () => {
    const contractValue = isFormValidated();
    if (contractValue) {
      console.log("here");
      try {
        const wei = web3.utils.toWei(`${contractValue}`, "ether");
        const [coinbase] = await web3.eth.getAccounts();
        console.log("contractAddress", contractAddress);
        const contractInstance = threeJudge(contractAddress);
        await contractInstance.methods
          .confirmPayment()
          .send({
            value: `${wei}`,
            from: coinbase,
          }) // Wait for transaction to confirm
          .on("confirmation", (confirmationNumber, receipt) => {
            // If first confirmation...
            if (confirmationNumber === 1) {
              console.log("payment confirmed", receipt);
              onSuccess();
            }
          });
      } catch (err) {
        console.log("err", err);
        setErrorMessage(err.message);
      }
      setLoading(!loading);
    }
  };
  return (
    <>
      <Card className="ActionCard">
        <form action="">
          <CardHeader color="primary">
            <Center>
              <h3>{action.name}</h3>
            </Center>
          </CardHeader>
          <CardBody className="ActionCard-Body">
            <div>{action.description}</div>
            <CustomInput
              ref={etherInputRef}
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
            />
          </CardBody>
          <CardFooter>
            <Button simple color="primary" size="lg" onClick={handleSubmitForm}>
              {action.name}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

const Center = styled.div`
  text-align: center;
`;

export default ConfirmPayment;
