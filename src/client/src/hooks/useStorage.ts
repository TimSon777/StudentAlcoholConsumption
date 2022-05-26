import { useEffect, useState } from "react";
import { Prediction } from "../types/Prediction";
import PredictionService from "../services/PredictionService";

export const useStorage = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    setPrediction(PredictionService.getPrediction());
  }, []);

  return {
    prediction,
    setPrediction: (pred: Prediction | null) => {
      PredictionService.savePrediction(pred);
      setPrediction(pred);
    },
  };
};
