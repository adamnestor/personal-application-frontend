import React from "react";
import { useAuth as useAuthHook } from "../hooks/useAuth";
import { AuthContext } from "./authContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authValue = useAuthHook();

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

