import PropTypes from "prop-types";

export const contractDetails = PropTypes.shape({
  escrowState: PropTypes.string.isRequired,
  disputeState: PropTypes.string.isRequired,
  buyer: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  buyerJudge: PropTypes.string.isRequired,
  buyerJudgeHasNominatedFinalJudge: PropTypes.bool.isRequired,
  buyerJudgeHasVotedForResolution: PropTypes.bool.isRequired,
  sellerJudge: PropTypes.string.isRequired,
  sellerJudgeHasNominatedFinalJudge: PropTypes.bool.isRequired,
  sellerJudgeHasVotedForResolution: PropTypes.bool.isRequired,
  nominatedJudge: PropTypes.string.isRequired,
  finalJudge: PropTypes.string.isRequired,
  votesForBuyer: PropTypes.string.isRequired,
  votesForSeller: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  awaitingParty: PropTypes.string.isRequired,
}).isRequired;
