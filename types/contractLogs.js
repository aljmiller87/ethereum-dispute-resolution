import PropTypes from "prop-types";

export const contractLogProp = PropTypes.shape({
  address: PropTypes.string.isRequired,
  blockHash: PropTypes.string.isRequired,
  blockNumber: PropTypes.number.isRequired,
  logIndex: PropTypes.number.isRequired,
  removed: PropTypes.bool.isRequired,
  transactionHash: PropTypes.string.isRequired,
  transactionIndex: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  returnValues: PropTypes.object,
  event: PropTypes.string.isRequired,
  signature: PropTypes.string.isRequired,
  raw: PropTypes.object.isRequired,
}).isRequired;
