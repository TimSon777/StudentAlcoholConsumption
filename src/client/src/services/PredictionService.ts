import { Prediction } from "../types/Prediction";

const KEY_NAME = "prediction";

const PredictionService = {
  savePrediction: (pred: Prediction | null) => {
    const str = JSON.stringify(pred);
    localStorage.setItem(KEY_NAME, str);
  },

  getPrediction: () => {
    const raw = localStorage.getItem(KEY_NAME);
    if (!raw) {
      return null;
    }

    const pred: Prediction = JSON.parse(raw);
    if (!pred) {
      return null;
    }

    return pred;
  },
};

export default PredictionService;
