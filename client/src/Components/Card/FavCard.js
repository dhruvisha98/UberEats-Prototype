import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import image from "./food.jpeg";
// import Axios from "axios";

// const fav = (resID) => {
//   Axios.post("http://localhost:5000/favourites", {
//     Restaurant_ID: resID,
//   }).then((response) => {
//     console.log(response);
//   });
// };

export default function Favcards({ favourites }) {
  const cardStyle = {
    display: "block",
    width: "500px",
    height: "400px",
    margin: "20px",
  };

  return (
    <div>
      <Card style={cardStyle}>
        <CardMedia component="img" alt="food" height="200" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {favourites.Restaurant_Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {favourites.Restaurant_Description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
