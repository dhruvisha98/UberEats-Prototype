import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import image from "./food.jpeg";
import food from "./taco.jpeg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Axios } from "../../axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from '@mui/icons-material/Edit';
import { Config } from "../../config";
const fav = (resID) => {
  Axios.post(Config.url + "/favourites", {
    Restaurant_ID: resID,
  }).then((response) => {
    console.log(response);
  });
};

export default function Cards(props) {
  const cardStyle = {
    display: "block",
    width: "500px",
    height: "400px",
    margin: "20px",
  };
  const cardStyles = {
    display: "block",
    width: "500px",
    height: "250x",
    margin: "20px",
  };    
  return (
      <div>
        <Card style={cardStyle}>
          <CardMedia component="img" alt="food" height="200" image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
          { props.content === "restaurant" && (
          <CardActions>
            <Button
              size="small"
              variant="contained"
              sx={2}
              onClick={() => fav(props.id)}
              endIcon={<FavoriteBorderIcon />}
            >
              Favourite
            </Button>
            <Button size="small" variant="contained">
              Learn More
            </Button>
          </CardActions>
          )}
           { props.content === "dish" && (
          <CardActions>
            <Button size="small" variant="contained">
               ${props.price}
            </Button>
            {props.user === "restaurant" && (
            <Button
             size="small"
             variant="contained"
             sx={2}
            >
              <EditIcon/>
            </Button>
            )}
            {props.user === "customer" && (
            <Button
             size="small"
             variant="contained"
             sx={2}
            >
              <AddShoppingCartIcon/>
            </Button>
            )}
          </CardActions>
          )}
        </Card>
      </div>
    );
  // } else {
  //   return (
  //     <div>
  //       {/* <img src={cover} alt="cover" height="200" width="1680" /> */}
  //       <Card style={cardStyles}>
  //         <CardMedia component="img" alt="food" height="140" image={food} />
  //         <CardContent>
  //           <Typography gutterBottom variant="h5" component="div">
  //             {restaurant.Dish_Name}
  //           </Typography>
  //           <Typography variant="body2" color="text.secondary">
  //             Ingredients :{restaurant.Ingredients}
  //           </Typography>
  //           <Typography variant="body2" color="text.secondary">
  //             Description :{restaurant.Dish_Description}
  //           </Typography>
  //         </CardContent>
  //         <CardActions>
  //           <Button size="small" variant="contained">
  //             ${restaurant.Dish_Price}
  //           </Button>

  //           {/* <Button
  //             size="small"
  //             variant="contained"
  //             sx={2}
  //             endIcon={<EditIcon />}
  //           /> */}
  //         </CardActions>
  //       </Card>
  //     </div>
  //   );
  // }
}
