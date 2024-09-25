"use client";
// Write me a wrapper so that I can use ReactQuery in a more convenient way
// this wrapper should create the context and provider for me

import React, { createContext, useContext } from "react";

import { useQuery, QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
