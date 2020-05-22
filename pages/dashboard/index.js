import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../layouts";

const Dashboard = () => {
  const { activeTab } = useSelector((state) => state.dashboardReducer);
  return (
    <Layout layout="dashboard">
      {activeTab === "contracts" && <h1>Contracts view</h1>}
      {activeTab === "create" && <h1>Create view</h1>}
      {activeTab === "search" && <h1>search view</h1>}
    </Layout>
  );
};

export default Dashboard;
