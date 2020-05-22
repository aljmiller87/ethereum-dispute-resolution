import React from "react";

// Material Components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// Kit Components
import Card from "../../../../components/Card/Card";
import CardBody from "../../../../components/Card/CardBody";
import CardHeader from "../../../../components/Card/CardHeader";

const ContractList = () => {
  return (
    <Card>
      <CardHeader color="info">
        <h2>ContractList component</h2>
      </CardHeader>
      <CardBody>
        <List component="nav" aria-label="main mailbox folders">
          {/* {contracts.map((contract) => (
            <ListItem key={contract} contract={contract} />
          ))} */}
          <ListItem>List Item</ListItem>
        </List>
      </CardBody>
    </Card>
  );
};

export default ContractList;
