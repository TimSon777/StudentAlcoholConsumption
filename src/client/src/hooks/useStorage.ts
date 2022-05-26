import { useEffect, useState } from "react";
import { Prediction } from "../types/Prediction";
import { DefaultStudentInfo, StudentInfo } from "../types/StudentInfo";
const PRED_KEY = "prediction";
const FORM_KEY = "form";

export const useStorage = () => {
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [form, setForm] = useState<StudentInfo>(DefaultStudentInfo);

  const savePrediction = (pred: Prediction | null) => {
    const str = JSON.stringify(pred);
    localStorage.setItem(PRED_KEY, str);
    setPrediction(pred);
  };

  const saveForm = (form: StudentInfo) => {
    const str = JSON.stringify(form);
    localStorage.setItem(FORM_KEY, str);
    setForm(form);
  };

  const getPrediction = () => {
    const raw = localStorage.getItem(PRED_KEY);
    if (!raw) {
      return null;
    }

    const pred: Prediction = JSON.parse(raw);
    if (!pred) {
      return null;
    }

    return pred;
  };

  const getForm = () => {
    const raw = localStorage.getItem(FORM_KEY);
    if (!raw) {
      return null;
    }

    const form: StudentInfo = JSON.parse(raw);
    if (!form) {
      return null;
    }

    return form;
  };

  useEffect(() => {
    setLoading(true);
    setPrediction(getPrediction());
    setForm(getForm() ?? DefaultStudentInfo);
    setLoading(false);
  }, []);

  return {
    loading,
    prediction,
    setPrediction: savePrediction,
    form,
    setForm: saveForm,
  };
};
