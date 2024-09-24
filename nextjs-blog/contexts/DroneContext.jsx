"use client";

// Write me a context provider for the drone content

import React, { createContext, useState, useEffect } from "react";

export const DroneContext = createContext();

export const DroneProvider = ({ children }) => {
  const [droneName, setDroneName] = useState("");
  const { data, isLoading, isError, error, refetch } = useAvailableDrones();

  // Use drone status

  return (
    <DroneContext.Provider
      value={{
        droneName,
        setDroneName,
        data,
        isLoading,
        isError,
        error,
        refetch,
      }}
    >
      {children}
    </DroneContext.Provider>
  );
};
