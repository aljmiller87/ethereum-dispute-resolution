import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import Sidebar from "../pages-sections/Sidebar";
import Header from "../pages-sections/Dashboard-Sections/Header";
import CreateContract from "pages-sections/Dashboard-Sections/CreateContract";

const Dashboard = ({ children }) => {
  const { pathname } = useRouter();
  const { activeTab } = useSelector((state) => state.dashboardReducer);
  const returnContent = () => {
    if (pathname === "/dashboard/[account]" && activeTab === "dashboard") {
      return children;
    }
    if (
      pathname === "/dashboard/contract/[contract]" &&
      activeTab === "detail"
    ) {
      return children;
    }
    if (activeTab === "create") {
      return <CreateContract />;
    }
    if (activeTab === "search") {
      return (
        <div>
          This will be the search component. Controlled by dashboard layout
        </div>
      );
    }
  };
  return (
    <DashboardLayout>
      <Sidebar />
      <MainApp>
        <Header />
        <main>{returnContent()}</main>
      </MainApp>
    </DashboardLayout>
  );
};

const DashboardLayout = styled.div`
  display: flex;
`;

const MainApp = styled.div`
  flex-grow: 1;
`;

export default Dashboard;
