import { createContext, useState } from "react";
import UserContext from "./UserContext";

const UserState = ({ children }) => {
  const [loginUser, setLoginUser] = useState({});

  return (
    <UserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </UserContext.Provider>
  );
};
