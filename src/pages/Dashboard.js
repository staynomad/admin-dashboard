import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import Navbar from "../components/Navbar";
import CreateContainerModal from "../components/CreateContainerModal";
import containerService from "../services/containerService";

const Dashboard = () => {
  const [containers, setContainers] = useState([1, 2, 3, 4]);
  const [createModal, setCreateModal] = useState(false);

  return (
    <div className="dashboard-screen">
      <Navbar />
      <div className="dashboard-container">
        <Modal open={createModal} onClose={() => setCreateModal(false)}>
          <CreateContainerModal closeModal={() => setCreateModal(false)} />
        </Modal>
        <div className="dashboard-container-header">
          <h1>Dashboard</h1>
          <AddCircleIcon onClick={() => setCreateModal(true)} />
        </div>
        <div className="dashboard-content">
          {containers.map((container) => (
            <div className="container"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
