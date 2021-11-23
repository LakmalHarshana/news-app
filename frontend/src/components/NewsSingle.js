import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export default function NewsSingle(props) {
  const { news } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="300"
        image={news.urlToImage}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {news.title}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          <b>Author:</b> {news.author}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          <b>Published:</b> {news.publishedAt}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          <b>Source:</b> {news.sourceName}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          <b> Source Link:</b>{" "}
          <a href={news.url} target="blank">
            {news.url}
          </a>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {news.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}
