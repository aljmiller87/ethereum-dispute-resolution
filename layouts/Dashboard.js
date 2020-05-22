import React from "react";
import styled from "styled-components";
import Sidebar from "../pages-sections/Sidebar";
import Header from "../pages-sections/Dashboard-Sections/Header";

const Dashboard = ({ children }) => {
  return (
    <DashboardLayout>
      <Sidebar />
      <MainApp>
        <Header />
        <main>{children}</main>
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
