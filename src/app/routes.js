import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, NotFound } from "../views/screens";
import { BaseLayout } from "../views/layouts/BaseLayout";
import AuthLayout from "../views/layouts/AuthLayout";
import Login from "../views/screens/auth/Login";
import Register from "../views/screens/auth/Register";
import Logout from "../views/components/Logout";
import PostCreate from "../views/screens/PostCreate";
import usePermission from "./hooks/usePermission";
import SingleForum from "../views/screens/SingleForum";
import MyForums from "../views/screens/MyForums";

export const LocalRoutes = () => {
  const location = useLocation();
  const { isAdmin } = usePermission();

  return (
    <Routes key={location.pathname} location={location}>
      <Route element={<BaseLayout />}>
        {/* Home Route */}
        <Route index exact path="/" element={<Home />}></Route>
        <Route index exact path="/posts" element={<MyForums />}></Route>
        <Route
          index
          exact
          path="/posts/add-post"
          element={<PostCreate />}
        ></Route>
        {isAdmin && (
            <Route
            index
            exact
            path="/admin/posts"
            element={<PostCreate />}
            ></Route>
        )}
        <Route index exact path="/posts/:id" element={<SingleForum />}></Route>
        <Route exact path="/logout" element={<Logout />}></Route>
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
