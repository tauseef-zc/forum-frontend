import React, { useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { loginUser } from '../../../app/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';


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
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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
      </Box>
    </div>
  );
}

export default Login;
