import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";

export const RegisterForm = (props) => {
  const { control, current, handleSubmit, errors, loading, onSubmit } = props;

  return (
    <Box
      component="form"
      noValidate
      sx={{
        mt: 1,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: "Name field is required",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Name"
            margin="normal"
            error={errors.name !== undefined}
            helperText={errors.name?.message}
            required
            autoComplete="name"
            autoFocus
          />
        )}
      />
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
        control={control}
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

      <Controller
        name="password_confirmation"
        control={control}
        rules={{
          required: "Confirm Password field is required",
          validate: (value) =>
            value === current || "The passwords do not match",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type="password"
            label="Confirm Password"
            margin="normal"
            error={errors.password_confirmation !== undefined}
            helperText={errors.password_confirmation?.message}
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
        Sign up
      </Button>
      <Grid container>
        <Grid item>
          <Link to="/login" variant="body2">
            {"Already have an account? Sign in"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
