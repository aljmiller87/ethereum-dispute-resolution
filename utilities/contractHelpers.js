// Config
import {
  EscrowState,
  EscrowSteps,
  DisputeState,
  DisputeSteps,
} from "../components/config/contract";

export const formatEscrowStatusOriginal = (summary) => {
  if (!summary || !Object.keys(summary.length > 0)) {
    return { error: "Error fetching data" };
  }

  const details = {
    escrowState: EscrowState[Number(summary["0"])],
    disputeState: DisputeState[Number(summary["1"])],
    buyer: summary["2"],
    seller: summary["3"],
    balance: summary["4"],
    disputeSummary: {
      buyerJudge: summary.disputeSummary["0"],
      buyerJudgeHasNominatedFinalJudge: summary.disputeSummary["1"],
      buyerJudgeHasVotedForResolution: summary.disputeSummary["2"],
      sellerJudge: summary.disputeSummary["3"],
      sellerJudgeHasNominatedFinalJudge: summary.disputeSummary["4"],
      sellerJudgeHasVotedForResolution: summary.disputeSummary["5"],
      nominatedJudge: summary.disputeSummary["6"],
      finalJudge: summary.disputeSummary["7"],
      sellerJudgeHasVotedForResolution: summary.disputeSummary["8"],
      votesForBuyer: summary.disputeSummary["9"],
      votesForSeller: summary.disputeSummary["10"],
      deadline: summary.disputeSummary["11"],
      awaitingParty: summary.disputeSummary["12"],
    },
  };

  return details;
};

export const formatContractData = ({ summary, disputeSummary }) => {
  if (!summary || !Object.keys(summary.length > 0)) {
    return { error: "Error fetching escrow summary" };
  }
  if (!disputeSummary || !Object.keys(disputeSummary.length > 0)) {
    return { error: "Error fetching dispute summary" };
  }

  const details = {
    escrowState: EscrowState[Number(summary["0"])],
    disputeState: DisputeState[Number(summary["1"])],
    buyer: summary["2"],
    seller: summary["3"],
    balance: summary["4"],
    buyerJudge: disputeSummary["0"],
    buyerJudgeHasNominatedFinalJudge: disputeSummary["1"],
    buyerJudgeHasVotedForResolution: disputeSummary["2"],
    sellerJudge: disputeSummary["3"],
    sellerJudgeHasNominatedFinalJudge: disputeSummary["4"],
    sellerJudgeHasVotedForResolution: disputeSummary["5"],
    nominatedJudge: disputeSummary["6"],
    finalJudge: disputeSummary["7"],
    sellerJudgeHasVotedForResolution: disputeSummary["8"],
    votesForBuyer: disputeSummary["9"],
    votesForSeller: disputeSummary["10"],
    deadline: disputeSummary["11"],
    awaitingParty: disputeSummary["12"],
  };

  return details;
};

// Filter functions
export const filterByActive = (allContracts) => {
  if (!allContracts) {
    return [];
  }
  const activeContracts = Object.keys(allContracts).filter((contract) => {
    const contractEscrowState = allContracts[contract].escrowState;
    return (
      contractEscrowState !== "IN_DISPUTE" && contractEscrowState !== "COMPLETE"
    );
  });
  return activeContracts;
};

export const filterByActionNeeded = (allContracts) => {
  return [];
};

export const filterByInDispute = (allContracts) => {
  if (!allContracts) {
    return [];
  }
  const activeDisputeContracts = Object.keys(allContracts).filter(
    (contract) => {
      const contractEscrowState = allContracts[contract].escrowState;
      const contractDisputeState = allContracts[contract].disputeState;
      return (
        contractEscrowState === "IN_DISPUTE" &&
        contractDisputeState !== "COMPLETE"
      );
    }
  );
  return activeDisputeContracts;
};

export const filterByCompleted = (allContracts) => {
  return [];
};

export const filterByDisputeCompleted = (allContracts) => {
  return [];
};

export const filterByAborted = (allContracts) => {
  return [];
};
