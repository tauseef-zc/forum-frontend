import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginUser } from "../../../app/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "../../components/forms/LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const { message, loading } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data) => {
    if (!loading) {
      dispatch(loginUser(data));
    }
  };

  useEffect(() => {
    if (message) {
      reset();
    }
  }, [loading, message, reset]);

  return (
    <div>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm
          loading={loading}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        ></LoginForm>
      </Box>
    </div>
  );
};

export default Login;
