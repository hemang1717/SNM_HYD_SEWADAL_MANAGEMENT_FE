import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isSignIn: boolean;
  setIsSignIn: (isSignIn: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isSignIn, setIsSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};