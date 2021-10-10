import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Axios } from "../../axios";
import { Config } from "../../config";

export default function Cart(props) {
  const orderCart = () => {
    Axios.post(Config.url + "/cart/order")
      .then((res) => {
        alert("Ordered");
        props.setOpen(false);
      })
      .catch((err) => {});
  };

  return (
    <Dialog style={{ border: 3 }} open={props.open}>
      <CloseIcon
        sx={{ m: 0, p: 2 }}
        onClick={(e) => {
          props.setOpen(false);
        }}
      />
      <DialogTitle>Cart</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <Typography>Restaurant Name</Typography>
        </ListItem>

        {props.data.map((d) => (
          <ListItem key={d.Dish_ID}>
            <Typography> {d.DISH_Name} </Typography>
            &nbsp;
            <Typography> ${d.Dish_Price} </Typography>
            &nbsp;
            <Typography> {d.Dish_QTY}QTY </Typography>
          </ListItem>
        ))}
        <ListItem>
          <Button variant="outlined" onClick={orderCart}>
            Place Order
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}
