import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// Actions
import * as ContractActions from "../../../redux/actions/blockchainStatusActions";

// Ethereum
import threeJudge from "../../../ethereum/threejudge";
import web3 from "../../../ethereum/web3";

// Material components
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";

// Kit core components
import Button from "components/nextjs-material-kit/CustomButtons/Button.js";
import Card from "components/nextjs-material-kit/Card/Card";
import CardBody from "components/nextjs-material-kit/Card/CardBody";
import CardFooter from "components/nextjs-material-kit/Card/CardFooter";
import CardHeader from "components/nextjs-material-kit/Card/CardHeader";
import CustomInput from "components/nextjs-material-kit/CustomInput/CustomInput.js";

const ProvideTestimony = ({ action, contractAddress }) => {
  const dispatch = useDispatch();
  const currentBlockChainWriteCalls = useSelector(
    (state) => state.blockchainCallsReducer.blockchainWriteCalls
  );
  const TestimonyRef = useRef();
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleProvideTestimony = async () => {
    if (!text) {
      return null;
    }
    try {
      dispatch(ContractActions.beginBlockchainWriteCall(contractAddress));
      const [coinbase] = await web3.eth.getAccounts();
      console.log("coinbase in provide testimony", coinbase);
      const contractInstance = threeJudge(contractAddress);
      await contractInstance.methods
        .provideTestimony(text)
        .send({
          from: coinbase,
        }) // Wait for transaction to confirm
        .on("confirmation", (confirmationNumber, receipt) => {
          // If first confirmation...
          if (confirmationNumber === 1) {
            console.log("provideTestimony confirmed", receipt);
            const index = currentBlockChainWriteCalls.findIndex(
              (address) => address === contract
            );
          }
        });
    } catch (err) {
      console.log("err", err);
      const index = currentBlockChainWriteCalls.findIndex(
        (address) => address === contract
      );
    } finally {
      dispatch(ContractActions.endBlockchainWriteCall(contractAddress));
    }
  };
  return (
    <>
      <Card className="ActionCard">
        <CardHeader color="primary">
          <Center>
            <h3>{action.name}</h3>
          </Center>
        </CardHeader>
        <CardBody className="ActionCard-Body">
          <div>{action.description}</div>
          <CustomInput
            ref={TestimonyRef}
            labelText="Submit testimony for the Judges to review"
            id="testimonyText"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: handleTextChange,
              type: "text",
              required: true,
              autoComplete: "off",
              value: text,
              endAdornment: (
                <InputAdornment position="end">
                  <People />
                </InputAdornment>
              ),
              autoComplete: "off",
            }}
          />
        </CardBody>
        <CardFooter>
          <Button
            simple
            color="primary"
            size="lg"
            onClick={handleProvideTestimony}
          >
            {action.name}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

const Center = styled.div`
  text-align: center;
`;

export default ProvideTestimony;
