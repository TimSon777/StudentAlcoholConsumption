import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { PredictionContext } from "../contexts/prediction.context";
import InfoCard from "../components/InfoCard";

export const ResultPage = () => {
  const { prediction } = useContext(PredictionContext);

  if (!prediction) {
    return (
      <Typography variant={"h4"} component={"div"} sx={{ textAlign: "center" }}>
        Not found. Please complete the survey first
      </Typography>
    );
  }

  return (
    <Grid container spacing={5} justifyContent={"center"}>
      <Grid item xs={12}>
        <Typography
          variant={"h4"}
          component={"div"}
          sx={{ textAlign: "center" }}
        >
          Result
        </Typography>
      </Grid>
      <Grid item xs={12} md={9} lg={6}>
        <InfoCard
          title={"Dalc"}
          value={prediction.Dalc.toFixed(2)}
          hoverText={"Workday alcohol consumption"}
        />
      </Grid>
      <Grid item xs={12} md={9} lg={6}>
        <InfoCard
          title={"Walc"}
          value={prediction.Walc.toFixed(2)}
          hoverText={"Weekend alcohol consumption"}
        />
      </Grid>
    </Grid>
  );
};
