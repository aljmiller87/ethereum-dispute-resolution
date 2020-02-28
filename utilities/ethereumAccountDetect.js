import Router from "next/router";

const reloadOnCoinbaseDetection = coinbase => {
  console.log("reloadOnCoinbaseDetection ran");
  if (window && window.ethereum && !coinbase) {
    console.log("want to refresh here");
    Router.replace(Router.router.route);
  }
};

export default reloadOnCoinbaseDetection;
