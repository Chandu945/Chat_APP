import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatComponent from "./Chat/ChatComponent";
import GroupManagement from "./Chat/GroupManagement";

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
    <div className="dashboard-container">
      <div className="chat-layout">
        <div className="chat-window">
          <ChatComponent />
        </div>
      </div>
    </div>
    <div className="sidebar">
          <GroupManagement />
        </div>
    </>
  );
};

export default Dashboard;