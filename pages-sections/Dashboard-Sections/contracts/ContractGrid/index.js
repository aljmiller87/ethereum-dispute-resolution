import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ContractList from "../ContractList";

// Hooks
import useContractEventSubscription from "../../../../hooks/useContractEventSubscription";

// Actions
import { fetchAllContractData } from "../../../../redux/actions/contractActions";

const ContractGrid = ({ contracts, userAddress }) => {
  const dispatch = useDispatch();
  // const [initListeners, setInitListeners] = useState(false);

  // const setAllNeededEthereumListeners = (contractsArr) => {
  //   if (initListeners) {
  //     return null;
  //   }
  //   setInitListeners(true);
  //   contractsArr.map((contract, index) => {
  //     const [state] = useContractEventSubscription(contract);
  //     console.log(index, state);
  //   });
  // };
  // setAllNeededEthereumListeners(contracts);

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
