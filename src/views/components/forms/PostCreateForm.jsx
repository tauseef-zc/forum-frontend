import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';
import NotificationAlert from '../Notification';

const PostCreateForm = (props) => {
  const { status, handleSubmit, message, errors, control, loading, onSubmit } = props;

  return (
    <Box
      component="form"
      noValidate
      sx={{
        mt: 1,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h6" gutterBottom>
        Create a Post
      </Typography>
      
      {message !== "" && (
        <NotificationAlert
          status={status}
          show={message !== ""}
          message={message}
        />
      )}

      <Grid container spacing={3} sx={{ marginTop: 1 }}>
        <Grid item xs={12}>
          <Controller
            name="question"
            control={control}
            rules={{
              required: "Question field is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="textarea"
                label="Question"
                error={errors.question !== undefined}
                helperText={errors.question?.message}
                required
                multiline
                rows={8}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              mb: 2,
            }}
            disabled={loading}
          >
            Submit Post
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostCreateForm;
