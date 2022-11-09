import { Box, Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import usePermission from "../../app/hooks/usePermission";
import Header from "../components/Header";

export const BaseLayout = () => {

  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { isAdmin } = usePermission();
  let menu = [];

  if (!auth.is_logged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if(isAdmin){
      menu = [
       { title: "Home", url: "/" },
       { title: "All Forums", url: "/admin/posts" },
       { title: "Add New Forum", url: "/posts/add-post" },
     ];
  }else{
      menu = [
        { title: "Home", url: "/" },
        { title: "My Forums", url: "/posts" },
        { title: "Add New Forum", url: "/posts/add-post" },
      ];
  }

  return (
    <React.Fragment>
      <ToastContainer position="bottom-right" limit={1} />
      <Header sections={menu} />
      <Box
        className="main-wrapper"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          height: "100%",
          minHeight: "90vh"
        }}
      >
        <Container>
          <Outlet {...location} />
        </Container>
      </Box>
    </React.Fragment>
  );
};
