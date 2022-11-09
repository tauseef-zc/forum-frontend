import { Divider, Grid, List, ListItem, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getApprovedPosts } from '../../app/slices/ApprovedPostSlice';
import Paginator from '../components/Paginator';

const Home = () => {

  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, forums } = useSelector((state) => state.approvedForums);

  const handleChange = (event) => {
     setSearch(event.target.value);
     dispatch(getApprovedPosts({ search: search, page: 1 }));
  };

  const handlePagination = ( search, page ) => {
      dispatch(getApprovedPosts({ search : search, page }));
  }

  return (
    <Grid item xs={12} md={12} sx={{ py: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography sx={{ py: 3 }} variant="h4" color="text.primary">
          Forums
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
            Object.keys(forums).length > 0 &&
            forums?.data.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <ListItem
                    onClick={() => {
                      navigate(`/posts/${item.id}`);
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "left",
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      sx={{ width: "100%" }}
                      component="h5"
                      variant="h6"
                      color="text.primary"
                      noWrap
                    >
                      {item.question}
                    </Typography>
                    <Typography
                      sx={{ width: "100%" }}
                      component="h6"
                      variant="p"
                      color="text.primary"
                    >
                      {item.created_at}
                    </Typography>
                    <Typography
                      sx={{ width: "100%" }}
                      component="h6"
                      variant="body2"
                      color="text.primary"
                    >
                      - by {item.user.name}
                    </Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
        </List>
        <Paginator
          path=""
          data={forums}
          paginateAction={handlePagination}
          search={search}
        />
      </Paper>
      <br />
    </Grid>
  );
}

export default Home
