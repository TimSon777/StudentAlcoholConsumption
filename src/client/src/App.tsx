import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { useRoutes } from "./hooks/routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { SnackbarProvider } from "notistack";
import { useStorage } from "./hooks/useStorage";
import { PredictionContext } from "./contexts/prediction.context";

function App() {
  const { prediction, setPrediction } = useStorage();
  const routes = useRoutes();

  return (
    <PredictionContext.Provider value={{ prediction, setPrediction }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={3}
            preventDuplicate
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Layout>{routes}</Layout>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </PredictionContext.Provider>
  );
}

export default App;
