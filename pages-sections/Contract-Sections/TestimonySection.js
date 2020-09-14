import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import DataTable from "../../components/DataTable";
import Columns from "../../components/DataTable/Config/ContractHistory";

const TestinomySection = ({ contractAddress }) => {
  const reduxLogs = useSelector(
    (state) => state.contractLogs[contractAddress] || []
  );
  const formattedLogs = reduxLogs.map((log) => {
    let counter = 0;
    const {
      functionCalled,
      triggeredByUser,
      timestamp,
      description,
    } = log.returnValues;
    counter += 1;
    return {
      id: counter,
      functionCalled,
      triggeredByUser,
      timestamp,
      description,
    };
  });
  return (
    <div>
      <DataTable columns={Columns} tableData={formattedLogs} />
    </div>
  );
};

TestinomySection.propTypes = {
  contractAddress: PropTypes.string.isRequired,
};

export default TestinomySection;
