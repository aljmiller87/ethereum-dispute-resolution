import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Ethereum
import threeJudge from "../../../ethereum/threejudge";
import web3 from "../../../ethereum/web3";

// Actions
import * as ContractActions from "../../../redux/actions/blockchainStatusActions";

// Kit core components
import Button from "components/nextjs-material-kit/CustomButtons/Button.js";
import Card from "components/nextjs-material-kit/Card/Card";
import CardBody from "components/nextjs-material-kit/Card/CardBody";
import CardFooter from "components/nextjs-material-kit/Card/CardFooter";
import CardHeader from "components/nextjs-material-kit/Card/CardHeader";

const ArbitrateDispute = ({ action, contractAddress }) => {
  const dispatch = useDispatch();
  const handleArbitrateDispute = async (isVoteForBuyer) => {
    try {
      dispatch(ContractActions.beginBlockchainWriteCall(contractAddress));
      const [coinbase] = await web3.eth.getAccounts();
      const contractInstance = threeJudge(contractAddress);
      await contractInstance.methods
        .arbtrateDispute(isVoteForBuyer)
        .send({
          from: coinbase,
        }) // Wait for transaction to confirm
        .on("confirmation", (confirmationNumber, receipt) => {
          // If first confirmation...
          if (confirmationNumber === 1) {
            console.log("arbtrateDispute confirmed", receipt);
          }
        });
    } catch (err) {
      console.log("err", err);
    } finally {
      dispatch(ContractActions.endBlockchainWriteCall(contractAddress));
    }
  };

  const handleVoteForBuyer = () => {
    handleArbitrateDispute(true);
  };

  const handleVoteForSeller = () => {
    handleArbitrateDispute(false);
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
          <Button simple color="primary" size="lg" onClick={handleVoteForBuyer}>
            Vote for Buyer
          </Button>
          <Button simple color="danger" size="lg" onClick={handleVoteForSeller}>
            Vote for Seller
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

const Center = styled.div`
  text-align: center;
`;

export default ArbitrateDispute;
