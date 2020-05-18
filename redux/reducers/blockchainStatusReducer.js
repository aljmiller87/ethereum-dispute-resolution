import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  blockchainReadCalls: 0,
  blockchainWriteCalls: [],
};

const blockchainStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case "BEGIN_BLOCKCHAIN_READ_CALL": {
      return {
        ...state,
        blockchainReadCalls: state.blockchainReadCalls + 1,
      };
    }
    case "END_BLOCKCHAIN_READ_CALL": {
      return {
        ...state,
        blockchainReadCalls: state.blockchainReadCalls - 1,
      };
    }
    case "UPDATE_BLOCKCHAIN_WRITE_CALL": {
      console.log("BEGIN_BLOCKCHAIN_WRITE_CALL in reducer", action.payload);
      return {
        ...state,
        blockchainWriteCalls: action.payload,
      };
    }
    default:
      return state;
  }
};

export default blockchainStatusReducer;
