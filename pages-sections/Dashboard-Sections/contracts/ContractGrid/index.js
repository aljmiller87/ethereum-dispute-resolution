import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ContractList from "../ContractList";

// Actions
import { fetchAllContractData } from "../../../../redux/actions/contractActions";

const ContractGrid = ({ contracts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContractData(contracts));
  }, []);
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item lg={6}>
          <ContractList />
        </Grid>
        <Grid item lg={6}>
          <ContractList />
        </Grid>
        <Grid item lg={6}>
          <ContractList />
        </Grid>
        <Grid item lg={6}>
          <ContractList />
        </Grid>
        <Grid item lg={6}>
          <ContractList />
        </Grid>
        <Grid item lg={6}>
          <ContractList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContractGrid;
