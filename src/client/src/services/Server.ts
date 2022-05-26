import { StudentInfo } from "../types/StudentInfo";
import axios from "../utils/axios";
import { Prediction } from "../types/Prediction";

const map = (data: any) => new Prediction(data.dalc, data.walc);

const Server = {
  getPrediction: async (info: StudentInfo): Promise<Prediction> => {
    // return { Dalc: 0.5, Walc: 0.5 };

    const response = await axios.post("/predict", info);
    return map(response.data);
  },
};

export default Server;

