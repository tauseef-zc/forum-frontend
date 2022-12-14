import { Grid, Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthLayout = () => {
    
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  if (auth.is_logged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <React.Fragment>
      <main className="main-wrapper">
        <ToastContainer position="bottom-right" limit={1} />
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Outlet {...location} />
          </Grid>
        </Grid>
      </main>
    </React.Fragment>
  );
};

export default AuthLayout;
