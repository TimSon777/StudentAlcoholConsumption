import React, { PropsWithChildren } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import { Header } from "./Header";

export default function Layout({ children }: PropsWithChildren<any>) {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container fixed sx={{ py: 2 }}>
        {children}
      </Container>
    </>
  );
}
