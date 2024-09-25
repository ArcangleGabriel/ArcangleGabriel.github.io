"use client";

// use effect
import { useEffect, useState, useContext, createContext } from "react";
import { TextField, Typography, Container, Box, Stack } from "@mui/material";

import Controller from "../comps/Controller";
import Conversation from "../comps/Conversation";
import PageWrapper from "../comps/PageWrapper";
import { ControllerProvider } from "../contexts/ControllerContext";

export default function RunMission() {
  // use effect timeout

  return (
    <PageWrapper>
      <ControllerProvider>
        <Container maxWidth="xl">
        <Typography variant="h4" align="center">GMU HUNT</Typography>
        <Conversation />
        </Container>
      </ControllerProvider>
    </PageWrapper>
  );
}
