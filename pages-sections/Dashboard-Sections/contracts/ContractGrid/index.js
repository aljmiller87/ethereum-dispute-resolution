import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ContractList from "../ContractList";

// Hooks
import useListeningService from "../../../../hooks/useListeningService";

// Actions
import { fetchAllContractData } from "../../../../redux/actions/contractActions";

const ContractGrid = ({ contracts }) => {
  const dispatch = useDispatch();

  const setAllNeededEthereumListeners = (contractsArr) => {
    contractsArr.map((contract, index) => {
      const [state] = useListeningService(contract);
      console.log(index, state);
    });
  };

  useEffect(() => {
    dispatch(fetchAllContractData(contracts));
    setAllNeededEthereumListeners(contracts);
  }, []);
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item lg={6}>
          <ContractList filter="active" />
        </Grid>
        <Grid item lg={6}>
          <ContractList filter="actionNeeded" />
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
