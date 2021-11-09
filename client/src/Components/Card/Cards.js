import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Axios } from "../../axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import { Config } from "../../config";
import { useHistory } from "react-router-dom";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
const fav = (resID) => {
  Axios.post(Config.url + "/favourites", {
    Restaurant_ID: resID,
  }).then((response) => {
    console.log(response);
  });
};

export default function Cards(props) {
  const [qty, setQty] = useState("1");
  const cardStyle = {
    display: "block",
    width: "500px",
    height: "500px",
    margin: "20px",
  };

  const history = useHistory();
  const handleLearnMore = () => {
    history.push("/restaurant/" + props.id);
  };

  const edit = (dID) => {
    history.push(`/edit/${dID}`);
  };
  // console.log("qqqq", props);
  return (
    <div>
      <Card style={cardStyle}>
        <CardMedia component="img" alt="food" height="300" src={props.image} />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        {props.content === "restaurant" && (
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
            <Button size="small" variant="contained" onClick={handleLearnMore}>
              Learn More
            </Button>
          </CardActions>
        )}
        {props.content === "dish" && (
          <CardActions>
            <Button size="small" variant="contained">
              ${props.price}
            </Button>
            {props.user === "restaurant" && (
              <Button size="small" variant="contained" sx={2}>
                <EditIcon onClick={() => edit(props.id)} />
              </Button>
            )}
            {props.user === "customer" && (
              <Select
                labelId="qty"
                id="qty_select"
                autoComplete="qty"
                name="qty"
                required
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </Select>
            )}
            {props.user === "customer" && (
              <Button size="small" variant="contained" sx={2}>
                <AddShoppingCartIcon
                  onClick={(e) => {
                    props.addToCart(props.id, props.restId, qty);
                  }}
                />
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </div>
  );
}
