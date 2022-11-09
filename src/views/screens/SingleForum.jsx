import {  Divider, Grid, List, ListItem, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../app/slices/SinglePostSlice";
import ReplyForm from "../components/forms/ReplyForm";

const SingleForum = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { forum, comments } = useSelector((state) => state.single);


  useEffect(() => {
    dispatch(getSinglePost(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid item xs={12} md={12} sx={{ py: 3 }}>
      <Paper sx={{ p: 3 }}>
        {!forum && <p>Loading...</p>}
        {Object.keys(forum).length > 0 && (
          <>
            <h3>{forum.question}</h3>
            <h4>by {forum.user.name}</h4>
            <h5>{forum.created_at}</h5>
            <Divider />
            <h4>
              Replies{" "}
              {Object.keys(comments).length > 0
                ? `(${Object.keys(comments).length})`
                : ""}
            </h4>
            {Object.keys(comments).length > 0 ? (
              <List>
                {comments.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <ListItem
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "left",
                          cursor: "pointer",
                        }}
                      >
                        <Typography
                          sx={{ width: "100%" }}
                          component="h6"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.user.name}
                        </Typography>
                        <Typography
                          sx={{ width: "100%" }}
                          component="h5"
                          variant="h6"
                          color="text.primary"
                        >
                          {item.comment}
                        </Typography>
                        <Typography
                          sx={{ width: "100%" }}
                          component="h6"
                          variant="p"
                          color="text.primary"
                        >
                          {item.created_at}
                        </Typography>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </List>
            ) : (
              <p>No comments for this Forum.</p>
            )}
            <Paper variant="outlined" sx={{ p: 3 }}>
              <ReplyForm id={params.id} />
            </Paper>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default SingleForum;
