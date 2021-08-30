import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import firebase from "firebase/app";
// import firebase from "firebase/compat/app";
import { auth } from "../firebase";
// import { signInWithGoogle } from "../firebase";

//signInWithPopup
//signInWithRedirect

export default function Login() {
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcom to ChatApp</h2>
        <div className="login-button google" onClick={signInWithGoogle}>
          <GoogleOutlined /> Sign In With Google
        </div>
        <br /> <br />
        {/* <div
          className="login-button facebook"
          onClick={() =>
            auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
          }
        >
          <FacebookOutlined /> Sign In With Facebook
        </div> */}
        <button>Other Login</button>
      </div>
    </div>
  );
}
