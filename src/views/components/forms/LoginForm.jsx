import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";

export const LoginForm = (props) => {
  const { handleSubmit, errors, control, loading } = props;

  return (
    <Box
      component="form"
      noValidate
      sx={{
        mt: 1,
      }}
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email field is required",
          pattern: {
            value:
              /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/,
            message: "Enter a valid email address",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type="email"
            label="Email Address"
            margin="normal"
            error={errors.email !== undefined}
            helperText={errors.email?.message}
            autoComplete="email"
            required
          />
        )}
      />
      <Controller
        name="password"
        control={props.control}
        rules={{
          required: "Password field is required",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            error={errors.password !== undefined}
            helperText={errors.password?.message}
            required
          />
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
        }}
        disabled={loading}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item>
          <Link to="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
