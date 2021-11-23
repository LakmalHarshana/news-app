import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

export default function NewsCard(props) {
  const { image, title, description, id } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="180" image={image} alt="image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography noWrap variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">
          <Link to={`/blog/${id}`}>Read More</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
