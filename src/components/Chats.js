import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
// import ChatList from "./ChatList/ChatList";

export default function Chats() {
  // const didMountRef = useRef(false);
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    // if (!didMountRef.current) {
    // didMountRef.current = true;

    if (!user) {
      history.push("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        //if no chat room exist yet
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        //Google user photo
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
    // }
  }, [user, history]);
  // <----------------------useEffect ends here

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <nav className="nav-bar">
        <div className="logo-tab">Chat App</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </nav>
      <div
        style={{
          color: "#ff59bb",
        }}
      >
        <ChatEngine
          height="calc(100vh - 66px)"
          projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
          userName={user.email}
          userSecret={user.uid}

          // renderChatList={(chatEngineState) => <ChatList {...chatEngineState} />}
        />
      </div>
    </div>
  );
}
