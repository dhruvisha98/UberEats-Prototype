import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useHistory } from "react-router-dom";

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
    height: "500px",
    margin: "20px",
  };
  const history = useHistory();
  const handleLearnMore = () => {
    history.push("/restaurant/" + favourites._id);
  };
  return (
    <div>
      <Card style={cardStyle}>
        <CardMedia
          component="img"
          alt="food"
          height="300"
          image={favourites.RestaurantImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {favourites.RestaurantName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {favourites.RestaurantDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            style={{ backgroundColor: "#000000" }}
            variant="contained"
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
