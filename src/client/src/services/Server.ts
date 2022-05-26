import { StudentInfo } from "../types/StudentInfo";
import axios from "../utils/axios";
import { Prediction } from "../types/Prediction";

const Server = {
  getPrediction: async (info: StudentInfo): Promise<Prediction> => {
    const response = await axios.post("/predict", info);
    return response.data as Prediction;
  },
};

export default Server;
