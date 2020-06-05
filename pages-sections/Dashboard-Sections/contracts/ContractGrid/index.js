import React from "react";

// Material UI Components
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

// Components
import ContractList from "../ContractList";

const ContractGrid = ({ contracts, userAddress }) => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item lg={6}>
          <ContractList contracts={contracts} filter="active" />
        </Grid>
        <Grid item lg={6}>
          <ContractList
            contracts={contracts}
            filter="actionNeeded"
            address={userAddress}
          />
        </Grid>
        <Grid item lg={6}>
          <ContractList contracts={contracts} filter="inDispute" />
        </Grid>
        <Grid item lg={6}>
          <ContractList contracts={contracts} filter="completed" />
        </Grid>
        <Grid item lg={6}>
          <ContractList contracts={contracts} filter="disputeCompleted" />
        </Grid>
        <Grid item lg={6}>
          <ContractList contracts={contracts} filter="aborted" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContractGrid;
