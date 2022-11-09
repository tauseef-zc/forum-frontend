import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetCommentSubmit, submitComment } from '../../../app/slices/SubmitCommentSlice';
import NotificationAlert from '../Notification';

const ReplyForm = (props) => {

    const { id } = props;
    const { status, message, loading } = useSelector((state) => state.submitComment);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      defaultValues: {
        comment: "",
        id,
        user_id: user.id
      },
    });

    const onSubmit = (data) => {
        if (!loading) {
            dispatch(submitComment(data));
        }
    }

    useEffect(() => {
      if (message) {
        reset();
        setTimeout(() => {
          dispatch(resetCommentSubmit());
        }, 5000);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, message, reset]);

  return (
    <>
      <Grid
        component="form"
        container
        spacing={3}
        sx={{ marginTop: 1 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12}>
          <Controller
            name="comment"
            control={control}
            rules={{
              required: "Reply field is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="textarea"
                label="Reply"
                error={errors.comment !== undefined}
                helperText={errors.comment?.message}
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
            Add Reply
          </Button>
        </Grid>
      </Grid>
      {message !== "" && (
        <NotificationAlert
          status={status}
          show={message !== ""}
          message={message}
        />
      )}
    </>
  );
}

export default ReplyForm