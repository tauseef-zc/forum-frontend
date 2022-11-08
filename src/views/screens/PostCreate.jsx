import { Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetForumSubmit, submitForum } from "../../app/slices/SubmitForumSlice";
import PostCreateForm from "../components/forms/PostCreateForm";

const PostCreate = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { status, message, loading } = useSelector((state) => state.forumSubmit);

    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      defaultValues: {
        question: "",
        user_id: user.id,
      },
    });

    const onSubmit = (data) => {
      if (!loading) {
        dispatch(submitForum(data));
      }
    };

    useEffect(() => {
      if (message) {
        reset();
        setTimeout(() => {
            dispatch(resetForumSubmit());
        }, 5000);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, message, reset]);

    return (
      <Grid item xs={12} md={12} sx={{ py: 3 }}>
        <Paper sx={{ p: 5, my: 3 }}>
          <PostCreateForm
            loading={loading}
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            message={message}
            status={status}
          />
        </Paper>
      </Grid>
    );
};

export default PostCreate;
