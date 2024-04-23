import { createContext } from "react";

export const AuthContext = createContext({
  isSignedIn: false,
  isNewUser: false,
  setIsNewUser: () => {},
  setIsSignedIn: () => {},
});
