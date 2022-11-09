import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../app/slices/AuthSlice";
import { RegisterForm } from "../../components/forms/RegisterForm";

const Register = () => {
  const dispatch = useDispatch();
  const { message, loading } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    if (!loading) {
      dispatch(registerUser(data));
    }
  };

  useEffect(() => {
    if (message) {
      reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          Register
        </Typography>
        <RegisterForm
          loading={loading}
          control={control}
          handleSubmit={handleSubmit}
          current={password.current}
          onSubmit={onSubmit}
          errors={errors}
         />
      </Box>
    </div>
  );
};

export default Register;
