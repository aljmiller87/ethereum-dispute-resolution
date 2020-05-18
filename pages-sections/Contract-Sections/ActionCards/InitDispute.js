import React from "react";
import styled from "styled-components";

// Ethereum
import threeJudge from "../../../ethereum/threejudge";
import web3 from "../../../ethereum/web3";

// Kit core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";

const InitDispute = ({ action, contractAddress }) => {
  const handleInitDispute = async () => {
    try {
      const [coinbase] = await web3.eth.getAccounts();
      const contractInstance = threeJudge(contractAddress);
      await contractInstance.methods
        .initDispute()
        .send({
          from: coinbase,
        }) // Wait for transaction to confirm
        .on("confirmation", (confirmationNumber, receipt) => {
          // If first confirmation...
          if (confirmationNumber === 1) {
            console.log("initDispute confirmed", receipt);
          }
        });
    } catch (err) {
      console.log("err", err);
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
          <Button simple color="primary" size="lg" onClick={handleInitDispute}>
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

export default InitDispute;
