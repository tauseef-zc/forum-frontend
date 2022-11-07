import { Container } from "@mui/material";
import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "../components/Header";

export const BaseLayout = () => {

  const location = useLocation();
  const menu = [
    { title: 'Forum', url: '/' }
  ]

  return (
    <React.Fragment>
      <Header sections={menu}/>
      <main className="main-wrapper">
        <Container maxWidth="lg">
          <Outlet {...location} />
        </Container>
      </main>
    </React.Fragment>
  );
};
