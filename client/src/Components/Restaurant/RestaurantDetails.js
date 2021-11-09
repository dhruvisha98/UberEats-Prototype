import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Cards from "../Card/Cards";
import { Axios } from "../../axios";
import { Config } from "../../config";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function RestaurantDetails(props) {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    width: 350,
  };
  const history = useHistory();
  const [openCard, setOpenCard] = useState(false);
  const [addDishId, setAddDishId] = useState("");

  const addToCart = (id, resId, qty) => {
    console.log(id);
    console.log(resId);
    setAddDishId(id);
    Axios.post(Config.url + "/cart", { Dish_ID: id, restId: resId, qty: qty })
      .then((res) => {
        alert("Added To Cart");
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 409) setOpenCard(true);
      });
  };

  const newcart = () => {
    Axios.post(Config.url + "/cart/resetCart", { Dish_ID: addDishId })
      .then((res) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log("Not deleted");
      });

    setOpenCard(false);
  };
  return (
    <div>
      <Navbardb />
      <Modal
        open={openCard}
        onClose={() => {
          setOpenCard(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Create new Order?</h2>
          <Typography>
            Your order contains items from another restaurant.Create a new order
          </Typography>
          <br />
          <Button
            onClick={newcart}
            style={{ width: "100%" }}
            variant="contained"
          >
            New Order
          </Button>
        </Box>
      </Modal>
      <div>
        <div>
          <img src={props.image} style={{ width: "100vw", height: "450px" }} />
        </div>
        <div style={{ width: "100%", marginLeft: "2%" }}>
          <h1>{props.name}</h1>
          <h3>Description: {props.detail.RestaurantDescription}</h3>
          <h3>Contact No.: {props.detail.RestaurantPhone}</h3>
          <h3>Location: {props.detail.RestaurantLocation}</h3>
          <h3>Delivery Mode : {props.detail.RestaurantDeliveryMode}</h3>
        </div>
        <container>
          <Grid container>
            {props.data &&
              props.data.map((menu) => (
                <Grid item key={menu._id} xs={12} md={8} lg={4}>
                  <Cards
                    content={"dish"}
                    user={props.user}
                    name={menu.DishName}
                    description={menu.DishDescription}
                    image={menu.DishImage}
                    id={menu._id}
                    restId={props.restaurant_id}
                    price={menu.DishPrice}
                    addToCart={addToCart}
                  />
                </Grid>
              ))}
          </Grid>
        </container>
      </div>
    </div>
  );
}
