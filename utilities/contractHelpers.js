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
