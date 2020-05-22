import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// Components
import ContractListItem from "./ContractListItem";
//  Kit Components
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
};

const ContractList = ({ contracts }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="info">
        <h2>Contracts</h2>
      </CardHeader>
      <CardBody>
        <List component="nav" aria-label="main mailbox folders">
          {contracts.map((contract) => (
            <ContractListItem key={contract} contract={contract} />
          ))}
        </List>
      </CardBody>
    </Card>
    // <div className={classes.root}>

    // </div>
  );
};

export default ContractList;
