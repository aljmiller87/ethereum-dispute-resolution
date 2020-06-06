import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import _difference from "lodash/difference";

// Ethereum
import factory from "../../ethereum/factory";

// Actions
import * as accountActions from "../../redux/actions/accountActions";
import * as contractActions from "../../redux/actions/contractDetails";
import * as contractLogs from "../../redux/actions/contractLogs";
import { setDashboardNav } from "../../redux/actions/dashboardActions";

// Layout
import Layout from "../../layouts";

// Sections
import ContractGrid from "pages-sections/Dashboard-Sections/contracts/ContractGrid";

const ProfilePage = ({ contractsProps, userAddressProps, error, ...rest }) => {
  const dispatch = useDispatch();
  const profileRef = useRef();
  const { contracts, address } = useSelector(
    (state) => state.accountReducer.currentView
  );
  const { contractDetails } = useSelector((state) => state);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { asPath } = useRouter();

  const setBatchContractData = async (contractsArray = contractsProps) => {
    await dispatch(contractActions.fetchBatchContractData(contractsArray));
    await dispatch(contractLogs.fetchBatchContractEvents(contractsArray));
    setDataLoaded(true);
  };

  const checkReduxStoreStatus = () => {
    // get list from redux store
    const reduxStoreContractDetailsArray = Object.keys(contractDetails);
    // get recently fetched list from initial props
    // compare the lists to find if Redux Store is missing any data
    const contractsNotInStore = _difference(
      contractsProps,
      reduxStoreContractDetailsArray
    );
    // Update store with missing data, if any
    setBatchContractData(contractsNotInStore);
  };

  // If getInitialProps passes error due to invalid address, useEffect will redirect to /dashboard
  useEffect(() => {
    if (error) {
      console.log("redirecting via dispatch replace due to error: ", error);
      Router.replace("/dashboard");
    }
  }, [error]);

  // Set the account and contracts of the currently viewed account to redux store
  useEffect(() => {
    dispatch(setDashboardNav("dashboard"));
    dispatch(accountActions.setcurrentView(userAddressProps));
    dispatch(accountActions.setCurrentViewContractList(contractsProps));
    checkReduxStoreStatus();
  }, [asPath]);

  // Use Effect that will generate Avatar based on user address
  useEffect(() => {
    if (profileRef.current) {
      profileRef.current.innerHTML = svg;
    }
  }, [profileRef.current]);

  return (
    <Layout layout="dashboard">
      {dataLoaded && (
        <ContractGrid contracts={contracts} userAddress={address} />
      )}
    </Layout>
  );
};

ProfilePage.getInitialProps = async function (props) {
  const userAddressProps = props.query.account;
  try {
    const contractsProps = await factory.methods
      .getdeployedContracts()
      .call({}, { from: userAddressProps });
    return { userAddressProps, contractsProps };
  } catch (error) {
    if (typeof window === "undefined" && props.res) {
      props.res.writeHead(302, { Location: "/dashboard" });
      props.res.end();
    } else {
      return { error: error.message };
    }
  }
};

export default ProfilePage;
