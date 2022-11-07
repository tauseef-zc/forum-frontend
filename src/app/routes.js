import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, NotFound } from "../views/screens";
import { BaseLayout } from "../views/layouts/BaseLayout";

export const LocalRoutes = () => {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route element={<BaseLayout />}>
        {/* Home Route */}
        <Route index exact path="/" element={<Home />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};
