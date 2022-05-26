import React from "react";
import { Route, Routes } from "react-router-dom";
import { IndexPage } from "../pages/Index.page";
import { ResultPage } from "../pages/Result.page";

export const useRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<IndexPage />} />
      <Route path={"/result"} element={<ResultPage />} />
    </Routes>
  );
};
