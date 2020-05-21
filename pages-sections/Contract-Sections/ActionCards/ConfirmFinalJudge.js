import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Ethereum
import threeJudge from "../../../ethereum/threejudge";
import web3 from "../../../ethereum/web3";

// Actions
import * as ContractActions from "../../../redux/actions/blockchainStatusActions";

// Kit core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";

const ConfirmFinalJudge = ({ action, contractAddress }) => {
  const dispatch = useDispatch();
  const handleConfirmNomitation = async (isApproved) => {
    try {
      dispatch(ContractActions.beginBlockchainWriteCall(contractAddress));
      const [coinbase] = await web3.eth.getAccounts();
      const contractInstance = threeJudge(contractAddress);
      await contractInstance.methods
        .confirmFinalJudge(isApproved)
        .send({
          from: coinbase,
        }) // Wait for transaction to confirm
        .on("confirmation", (confirmationNumber, receipt) => {
          // If first confirmation...
          if (confirmationNumber === 1) {
            console.log("confirmFinalJudge confirmed", receipt);
          }
        });
    } catch (err) {
      console.log("err", err);
    } finally {
      dispatch(ContractActions.endBlockchainWriteCall(contractAddress));
    }
  };

  const handleConfirmNomination = () => {
    handleConfirmNomitation(true);
  };

  const handleRejectNomination = () => {
    handleConfirmNomitation(false);
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
            onClick={handleConfirmNomination}
          >
            Confirm Nomination
          </Button>
          <Button
            simple
            color="danger"
            size="lg"
            onClick={handleRejectNomination}
          >
            Reject Nomination
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

const Center = styled.div`
  text-align: center;
`;

export default ConfirmFinalJudge;