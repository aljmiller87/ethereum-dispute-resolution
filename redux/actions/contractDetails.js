import ThreeJudge from "../../ethereum/threejudge";
import { formatContractData } from "../../utilities/contractHelpers";

//Action Types
export const SET_CONTRACT_STATE = "SET_CONTRACT_STATE";
export const SET_BATCH_CONTRACT_STATE = "SET_BATCH_CONTRACT_STATE";

//Action Creators
export const setContractState = (contractAddress, contractState) => ({
  type: SET_CONTRACT_STATE,
  payload: { contractAddress, contractState },
});

export const setBatchContractData = (contractData) => ({
  type: SET_BATCH_CONTRACT_STATE,
  payload: contractData,
});

export const asyncFetchState = (address) => {
  return async (dispatch) => {
    try {
      const contractState = await fetchContractDetails(address);
      dispatch(setContractState(address, contractState));
    } catch (error) {
      console.log("asyncFetchState: ", error);
    }
    return "done";
  };
};

export const fetchBatchContractData = (contracts) => {
  return async (dispatch) => {
    try {
      const allData = {};
      await Promise.all(
        contracts.map(async (contract) => {
          let contractState = await fetchContractDetails(contract);
          allData[contract] = contractState;
        })
      );
      dispatch(setBatchContractData(allData));
    } catch (error) {
      console.log("fetchBatchContractData error:", error.message);
    }
  };
};

export const fetchContractDetails = async (contract) => {
  const campaign = ThreeJudge(contract);
  const escrowSummary = await campaign.methods.getStatus().call();
  const disputeSummary = await campaign.methods.getDisputeStatus().call();
  const formattedSummary = formatContractData(escrowSummary, disputeSummary);
  return formattedSummary;
};
