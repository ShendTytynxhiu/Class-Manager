import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";

function FeaturedPost(props) {
  const [redirect, setRedirect] = useState(false);

  const handleRedirectChange = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/class/" + props.id.toString()} />;
  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="button" onClick={handleRedirectChange}>
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {props.post.subject}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {props.post.teacher_name}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {props.post.start_date} : {props.post.end_date}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Enter
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={props.image}
            alt={props.post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    teacher_name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
