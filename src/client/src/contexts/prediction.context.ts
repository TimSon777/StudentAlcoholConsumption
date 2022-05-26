import { createContext } from "react";
import { Prediction } from "../types/Prediction";

function noop() {
  return false;
}

type PredictionContextInfo = {
  prediction: Prediction | null;
  setPrediction: (pred: Prediction | null) => void;
};

export const PredictionContext = createContext<PredictionContextInfo>({
  prediction: null,
  setPrediction: noop,
});
