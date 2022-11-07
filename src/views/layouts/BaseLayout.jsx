import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";

export const BaseLayout = () => {

  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  if (!auth.is_logged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const menu = [
    { title: 'Forum', url: '/' }
  ]

  return (
    <React.Fragment>
      <ToastContainer position="top-right" limit={1} />
      <Header sections={menu} />
      <main className="main-wrapper">
        <Container maxWidth="lg">
          <Outlet {...location} />
        </Container>
      </main>
    </React.Fragment>
  );
};
