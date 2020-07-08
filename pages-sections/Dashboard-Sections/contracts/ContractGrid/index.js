import React from "react";

// Material UI Components
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

// Components
import ContractList from "../ContractList";

const ContractGrid = ({ userAddress }) => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item lg={6}>
          <ContractList filter="active" />
        </Grid>
        <Grid item lg={6}>
          <ContractList filter="actionNeeded" address={userAddress} />
        </Grid>
        <Grid item lg={6}>
          <ContractList filter="inDispute" />
        </Grid>
        <Grid item lg={6}>
          <ContractList filter="completed" />
        </Grid>
        <Grid item lg={6}>
          <ContractList filter="disputeCompleted" />
        </Grid>
        <Grid item lg={6}>
          <ContractList filter="aborted" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContractGrid;
