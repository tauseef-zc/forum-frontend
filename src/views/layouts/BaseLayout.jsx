import React from "react";
import { useLocation, Outlet } from "react-router-dom";

export const BaseLayout = () => {

  const location = useLocation();

  return (
    <main >
      <div className="main-wrapper">
          <Outlet {...location} />
      </div>
    </main>
  );
};
