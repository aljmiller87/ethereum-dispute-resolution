import React from "react";
import styled from "styled-components";
import Sidebar from "../pages-sections/Sidebar";

const Dashboard = ({ children }) => {
  return (
    <DashboardLayout>
      <Sidebar />
      {children}
    </DashboardLayout>
  );
};

const DashboardLayout = styled.div`
  display: flex;
`;

export default Dashboard;
