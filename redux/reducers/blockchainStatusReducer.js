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
    case "BEGIN_BLOCKCHAIN_WRITE_CALL": {
      console.log("BEGIN_BLOCKCHAIN_WRITE_CALL in reducer", action.payload);
      return {
        ...state,
        blockchainWriteCalls: [...state.blockchainWriteCalls, action.payload],
      };
    }
    case "END_BLOCKCHAIN_WRITE_CALL": {
      const updatedCallList = [...state.blockchainWriteCalls];
      const foundIndex = updatedCallList.findIndex(
        (address) => address === action.payload
      );
      updatedCallList.splice(foundIndex, 1);
      return {
        ...state,
        blockchainWriteCalls: updatedCallList,
      };
    }
    default:
      return state;
  }
};

export default blockchainStatusReducer;
