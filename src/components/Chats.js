import React from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function Chats() {
  const history = useHistory();
  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  return (
    <div className="chats-page">
      <nav className="nav-bar">
        <div className="logo-tab">Chat App</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </nav>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectId={process.env.REACT_CHAT_ENGINE_PROJECT_ID}
        userName="."
        userSecret="."
      />
    </div>
  );
}
