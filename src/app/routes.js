import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, NotFound } from "../views/screens";
import { BaseLayout } from "../views/layouts/BaseLayout";
import AuthLayout from "../views/layouts/AuthLayout";
import Login from "../views/screens/auth/Login";
import Register from "../views/screens/auth/Register";

export const LocalRoutes = () => {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route element={<BaseLayout />}>
        {/* Home Route */}
        <Route index exact path="/" element={<Home />}></Route>
      </Route>
      <Route element={<AuthLayout />}>
        {/* Auth Routes */}
        <Route index exact path="/login" element={<Login />}></Route>
        <Route index exact path="/register" element={<Register />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};
