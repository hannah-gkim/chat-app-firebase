import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const AuthContext = React.createContext(); //like "GlobalContext"
//so that auth can be used globally? like createContext(initialState);
export const useAuth = () => useContext(AuthContext);
//like "GlobalProvider"
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  //signup
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }

  //call whenever user object(when user added) and history changes(when we re navigate)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        history.push("/chats");
      }
    });
  }, [user, history]);

  //when working with AuthContext need to have value object
  const value = { user, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {/* if not loading (user is updated ?) then show children */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
