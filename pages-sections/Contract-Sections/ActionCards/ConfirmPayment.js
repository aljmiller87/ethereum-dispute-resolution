import React from "react";
import styled from "styled-components";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";

const ConfirmPayment = ({ action }) => {
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
          <Button simple color="primary" size="lg">
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

export default ConfirmPayment;
