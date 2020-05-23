import ThreeJudge from "../ethereum/threejudge";
import { formatContractData } from "./contractHelpers";

export const setContractEventListeners = async (contractAddress) => {
  try {
    const instance = ThreeJudge(contractAddress);
    const summary = await instance.methods.getStatus().call();
    const disputeSummary = await instance.methods.getDisputeStatus().call();
    const { escrowState, disputeState } = formatContractData({
      summary,
      disputeSummary,
    });

    if (
      escrowState === "CANCELLED" ||
      escrowState === "COMPLETE" ||
      disputeState === "COMPLETE"
    ) {
      return "Contract is inactive";
    }
    instance.events
      .allEvents({
        fromBlock: "latest",
      })
      .on("connected", function (subscriptionId) {
        console.log("connected subscriptionId", subscriptionId);
      })
      .on("data", function (event) {
        console.log("data event", event);
        dispatch(contractActions.addEvent(contractAddress, event));
        dispatch(
          contractActions.asyncFetchState(contractAddress, instanceRef.current)
        );
      })
      .on("changed", function (event) {
        console.log("changed event", event);
        // remove event from local database
      })
      .on("error", function (error, receipt) {
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log("error", error);
        console.log("error receipt", receipt);
      });
  } catch (error) {
    return { error: true, message: error.message };
  }
};
