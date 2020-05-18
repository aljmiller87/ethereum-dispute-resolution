// Config
import {
  EscrowState,
  EscrowSteps,
  DisputeState,
  DisputeSteps,
} from "../components/config/contract";

export const formatEscrowStatus = (summary) => {
  if (!summary || !Object.keys(summary.length > 0)) {
    return { error: "Error fetching data" };
  }

  const details = {
    escrowState: EscrowState[Number(summary["0"])],
    disputeState: DisputeState[Number(summary["1"])],
    buyer: summary["2"],
    seller: summary["3"],
    balance: summary["4"],
  };

  return details;
};

export const getEscrowStatus = (state) => {
  if (!state) {
    return null;
  }
  let stateAsInt = typeof state === "string" ? Number(state) : state;
  const escrowState = EscrowState[stateAsInt];
};
