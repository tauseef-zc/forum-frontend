import { Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <Grid item xs={12} md={12}>
      <Typography sx={{ py: 3 }} variant="h4" color="text.primary">
        Forums
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
          }}
        >
          <Typography
            sx={{ textAlign: "left" }}
            component="h5"
            variant="h6"
            color="text.primary"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores,
            amet. Culpa, recusandae dignissimos non distinctio corrupti, quia,
            quibusdam nesciunt repudiandae in magnam pariatur error quisquam
            labore sapiente ipsum laboriosam earum.
          </Typography>
          <Typography
            sx={{ width: "100%" }}
            component="p"
            variant="body2"
            color="text.primary"
          >
            Ali Connors
          </Typography>
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Grid>
  );
}

export default Home
