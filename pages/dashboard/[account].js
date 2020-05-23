import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// Ethereum
import factory from "../../ethereum/factory";

// Layout
import Layout from "../../layouts";

// Sections
import ContractList from "pages-sections/Dashboard-Sections/ContractList";
import ContractGrid from "pages-sections/Dashboard-Sections/contracts/ContractGrid";

const ProfilePage = ({ contracts, userAddress, ...rest }) => {
  const profileRef = useRef();
  const accountReducer = useSelector((state) => state.accountReducer);
  const { pathname } = useSelector((state) => state.router.location);
  let address =
    pathname === "/" ? userAddress : pathname.replace("/dashboard/", "");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const contractListToWatch = isUserLoggedIn
    ? accountReducer.contracts
    : contracts;

  useEffect(() => {
    if (!accountReducer || !accountReducer.account) {
      return;
    }
    if (accountReducer.account === address && !isUserLoggedIn) {
      setIsUserLoggedIn(true);
    }

    if (accountReducer.account !== address && isUserLoggedIn) {
      setIsUserLoggedIn(false);
    }
  }, [accountReducer.account, address]);

  useEffect(() => {
    if (profileRef.current) {
      profileRef.current.innerHTML = svg;
    }
  }, [profileRef.current]);

  return (
    <Layout layout="dashboard">
      <ContractGrid contracts={contractListToWatch} />
      {/* {contractListToWatch.length > 0 && (
        <ListSection>
          <ContractList contracts={contractListToWatch} />
        </ListSection>
      )} */}
    </Layout>
  );
};

const ListSection = styled.section`
  padding: 60px 0;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

ProfilePage.getInitialProps = async function (props) {
  const userAddress = props.query.account;
  console.log("props.query.account", props.query.account);
  const contracts = await factory.methods
    .getdeployedContracts()
    .call({}, { from: userAddress });
  return { userAddress, contracts };
};

export default ProfilePage;
