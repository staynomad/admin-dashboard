import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import Navbar from "../components/Navbar";
import CreateContainerModal from "../components/CreateContainerModal";
import containerService from "../services/containerService";

const Dashboard = () => {
  const [containers, setContainers] = useState([]);
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const resp = await containerService.getAllContainers();
      console.log(resp.data.containers);
      setContainers(resp.data.containers);
    };
    getData();
  }, []);

  return (
    <div className="dashboard-screen">
      <Navbar />
      <div className="dashboard-container">
        <Modal open={createModal} onClose={() => setCreateModal(false)}>
          <CreateContainerModal
            closeModal={() => setCreateModal(false)}
            containers={containers}
            setContainers={setContainers}
          />
        </Modal>
        <div className="dashboard-container-header">
          <h1>Dashboard</h1>
          <AddCircleIcon onClick={() => setCreateModal(true)} />
        </div>
        <div className="dashboard-content">
          {containers.map((container) => (
            <div key={Math.random()} className="container"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
