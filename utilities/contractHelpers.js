// Config
import {
  EscrowState,
  EscrowSteps,
  DisputeState,
  DisputeSteps
} from "../components/config/contract";

export const formatEscrowStatus = summary => {
  if (!summary || !Object.keys(summary.length > 0)) {
    return { error: "Error fetching data" };
  }

  const details = {
    escrowState: EscrowState[Number(summary["0"])],
    disputeState: DisputeState[Number(summary["1"])],
    buyer: summary["2"].toLowerCase(),
    seller: summary["3"].toLowerCase(),
    balance: summary["4"]
  };

  return details;
};
