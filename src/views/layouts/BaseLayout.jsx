import { Box, Container } from "@mui/material";
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
    { title: "Home", url: "/" },
    { title: "Add Post", url: "/posts/add-post" },
    { title: "My Posts", url: "/posts" },
  ];

  return (
    <React.Fragment>
      <ToastContainer position="top-right" limit={1} />
      <Header sections={menu} />
      <Box
        className="main-wrapper"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          height: "90vh",
        }}
      >
        <Container>
          <Outlet {...location} />
        </Container>
      </Box>
    </React.Fragment>
  );
};
