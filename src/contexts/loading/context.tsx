"use client";
import React, { createContext, useContext, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Loading from "../../../public/loading.json";
type LoadingContextType =
  | {
      isLoading: boolean;
      setLoading: (isLoading: boolean) => void;
    }
  | undefined;

// Create the context
const LoadingContext = createContext<LoadingContextType>(undefined);

// Provider component
export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && (
        <div
          style={{
            zIndex: 2,
            position: "fixed",
            top: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,.8)",
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Player autoplay loop src={Loading} style={{ height: "400px", width: "400px" }} />
        </div>
      )}
    </LoadingContext.Provider>
  );
};

// Custom hook to use loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("LoadingContext should wrap your app");
  }
  return context;
};
