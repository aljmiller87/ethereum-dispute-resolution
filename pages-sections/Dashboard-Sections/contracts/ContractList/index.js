import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  filterByActive,
  filterByActionNeeded,
  filterByInDispute,
  filterByCompleted,
  filterByDisputeCompleted,
  filterByAborted,
} from "../../../../utilities/contractHelpers";

// Material Components
import List from "@material-ui/core/List";

import ContractListItem from "../ContractListItem";

// Kit Components
import Card from "../../../../components/nextjs-material-kit/Card/Card";
import CardBody from "../../../../components/nextjs-material-kit/Card/CardBody";
import CardHeader from "../../../../components/nextjs-material-kit/Card/CardHeader";

const title = {
  active: "Active Contracts",
  actionNeeded: "Action Needed By User",
  inDispute: "Contracts In Active Dispute",
  completed: "Completed Contracts",
  disputeCompleted: "Dispute Completed",
  aborted: "Contracts that were Cancelled",
};

const filterFunctions = {
  active: filterByActive,
  actionNeeded: filterByActionNeeded,
  inDispute: filterByInDispute,
  completed: filterByCompleted,
  disputeCompleted: filterByDisputeCompleted,
  aborted: filterByAborted,
};
const ContractList = ({ contracts, filter, address = null }) => {
  const { contractDetails } = useSelector((state) => state);
  const [contractDetailList, setContractDetailList] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);

  useEffect(() => {
    const contractDetailsArray = contracts.map((contract) => {
      return { ...contractDetails[contract], address: contract };
    });
    const filterFunction = filterFunctions[filter];
    const activeContracts = filterFunction(contractDetailsArray);
    if (typeof activeContracts === "object" && activeContracts.length) {
      setFilteredContracts(activeContracts);
    }
  }, [contracts]);

  return (
    <Card>
      <CardHeader color="info">
        <h2>{title[filter]}</h2>
      </CardHeader>
      <CardBody>
        <List component="nav" aria-label="main mailbox folders">
          {filteredContracts.map((contract) => (
            <ContractListItem key={contract.address} contract={contract} />
          ))}
        </List>
      </CardBody>
    </Card>
  );
};

export default ContractList;
