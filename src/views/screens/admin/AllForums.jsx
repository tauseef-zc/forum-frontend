import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deletePost,
  getAdminPosts,
  updateStatus
} from "../../../app/slices/AdminForumsSlice";
import Paginator from "../../components/Paginator";

const AllForums = () => {
  const [search, setSearch] = React.useState("");
  const [forum, removeForum] = React.useState(null);
  const [posts, setPosts] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, forums } = useSelector((state) => state.AdminForums);

  const handleChange = (event) => {
    setSearch(event.target.value);
    dispatch(getAdminPosts({ search: search, page: 1 }));
  };

  const handlePagination = (search, page) => {
    dispatch(getAdminPosts({ search: search, page }));
  };

  const handleDelete = (id) => {
    removeForum(id);
  };
  
  const handleUpdateStatus = (id, status) => {
    dispatch(updateStatus({ id, status }));
    let postItems = { ...posts };
    postItems["data"] = postItems.data.map((item) => {
        if(item.id === id){
            let obj = { ...item };
            obj.status = `${status}`;
            obj.status_text = status === 1 ? 'Approved' : 'Rejected';
            return obj;
        }
        return item;
    });
    setPosts({ ...postItems });
  };

  React.useEffect(() => {
    if (forum !== null) {
      dispatch(deletePost(forum));
      let postItems = { ...posts };
      postItems["data"] = postItems.data.filter((item) => item.id !== forum);
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
          All Forums
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
                    <Grid container spacing={2} my={1}>
                      {item.status !== "1" && (
                        <Grid item>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleUpdateStatus(item.id, 1)}
                          >
                            Accept
                          </Button>
                        </Grid>
                      )}

                      {item.status !== "2" && (
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdateStatus(item.id, 2)}
                          >
                            Reject
                          </Button>
                        </Grid>
                      )}

                      <Grid item>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
        </List>
        <Paginator
          path="admin/posts"
          data={forums}
          paginateAction={handlePagination}
          search={search}
        />
      </Paper>
      <br />
    </Grid>
  );
};

export default AllForums;
