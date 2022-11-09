import { Button, Divider, Grid, List, ListItem, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost, getMyPosts } from '../../app/slices/MyForumsSlice';
import Paginator from '../components/Paginator';

const MyForums = () => {

  const [search, setSearch] = React.useState("");
  const [forum, removeForum] = React.useState(null);
  const [posts, setPosts] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, forums } = useSelector((state) => state.myForums);

  const handleChange = (event) => {
     setSearch(event.target.value);
     dispatch(getMyPosts({ search: search, page: 1 }));
  };

  const handlePagination = ( search, page ) => {
    dispatch(getMyPosts({ search: search, page }));
  }

  const handleDelete = (id) => {
    removeForum(id);
  }

  React.useEffect(() => {
    if (forum !== null) {
      dispatch(deletePost(forum));
      let postItems = { ...posts };
      postItems['data'] = postItems.data.filter((item) => item.id !== forum);
      setPosts({ ...postItems });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forum]);

  React.useEffect(() => {
    setPosts(forums);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forums]);

  return (
    <Grid item xs={12} md={12} sx={{ py: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography sx={{ py: 3 }} variant="h4" color="text.primary">
          My Forums
        </Typography>
        <TextField
          fullWidth
          onChange={handleChange}
          name="search"
          label="Search"
          margin="normal"
          value={search}
          required
        />
        <List
          sx={{ width: "100%", bgcolor: "background.paper", marginBottom: 2 }}
        >
          {loading && (
            <ListItem style={{ textAlign: "center" }}>Loading...</ListItem>
          )}
          {!loading &&
            Object.keys(posts).length > 0 &&
            posts?.data.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "left",
                    }}
                  >
                    <Typography
                      sx={{ width: "100%", cursor: "pointer" }}
                      component="h5"
                      variant="h6"
                      color="text.primary"
                      onClick={() => {
                        navigate(`/posts/${item.id}`);
                      }}
                      noWrap
                    >
                      {item.question}
                    </Typography>
                    <Typography
                      sx={{ width: "100%", cursor: "pointer" }}
                      component="h6"
                      variant="p"
                      color="text.primary"
                      onClick={() => {
                        navigate(`/posts/${item.id}`);
                      }}
                    >
                      Date: {item.created_at} | Status: {item.status_text}
                    </Typography>
                    <Typography
                      sx={{ width: "100%", cursor: "pointer" }}
                      component="h6"
                      variant="body2"
                      color="text.primary"
                      onClick={() => {
                        navigate(`/posts/${item.id}`);
                      }}
                    >
                      - by {item.user.name}
                    </Typography>
                    <Grid item md={12}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
        </List>
        <Paginator
          path="posts"
          data={forums}
          paginateAction={handlePagination}
          search={search}
        />
      </Paper>
      <br />
    </Grid>
  );
}

export default MyForums;
