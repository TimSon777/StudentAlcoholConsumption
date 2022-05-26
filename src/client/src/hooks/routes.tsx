import React from "react";
import { Route, Routes } from "react-router-dom";
import { IndexPage } from "../pages/Index.page";

export const useRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<IndexPage />} />
    </Routes>
  );
};
