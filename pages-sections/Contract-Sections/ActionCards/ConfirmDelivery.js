import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// Actions
import * as ContractActions from "../../../redux/actions/blockchainStatusActions";

// Ethereum
import threeJudge from "../../../ethereum/threejudge";
import web3 from "../../../ethereum/web3";

// Kit core components
import Button from "components/nextjs-material-kit/CustomButtons/Button.js";
import Card from "components/nextjs-material-kit/Card/Card";
import CardBody from "components/nextjs-material-kit/Card/CardBody";
import CardFooter from "components/nextjs-material-kit/Card/CardFooter";
import CardHeader from "components/nextjs-material-kit/Card/CardHeader";

const ConfirmDelivery = ({ action, contractAddress }) => {
  const dispatch = useDispatch();
  const currentBlockChainWriteCalls = useSelector(
    (state) => state.blockchainCallsReducer.blockchainWriteCalls
  );

  const handleConfirmDelivery = async () => {
    try {
      dispatch(ContractActions.beginBlockchainWriteCall(contractAddress));
      const [coinbase] = await web3.eth.getAccounts();
      const contractInstance = threeJudge(contractAddress);
      await contractInstance.methods
        .confirmDelivery()
        .send({
          from: coinbase,
        }) // Wait for transaction to confirm
        .on("confirmation", (confirmationNumber, receipt) => {
          // If first confirmation...
          if (confirmationNumber === 1) {
            console.log("confirmDelivery confirmed", receipt);
          }
        });
    } catch (err) {
      console.log("err", err);
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
        <CardBody className="ActionCard-Body">{action.description}</CardBody>
        <CardFooter>
          <Button
            simple
            color="primary"
            size="lg"
            onClick={handleConfirmDelivery}
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

export default ConfirmDelivery;
