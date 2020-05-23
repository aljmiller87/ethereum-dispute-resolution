export const getNetwork = (id) => {
  switch (id) {
    case "1":
      return "Main";
    case "3":
      return "Ropsten";
    case "4":
      return "Rinkeby";
    case "42":
      return "Kovan";

    default:
      return "Error";
  }
};

export const getNetworkURL = (id) => {
  switch (id) {
    case "1":
      return "https://etherscan.io/address/";
    case "3":
      return "https://ropsten.etherscan.io/address/";
    case "4":
      return "https://rinkeby.etherscan.io/address/";
    case "42":
      return "https://kovan.etherscan.io/address/";

    default:
      return "Error";
  }
};
