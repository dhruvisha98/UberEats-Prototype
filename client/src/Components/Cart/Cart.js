import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";

export default function Cart(props) {
  let emails = ["a", "b", "c"];
  const cardStyles = {
    border: 5,
    borderColor: "#b26a00",
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
        <ListItem>
          <Button variant="outlined">
            <AddIcon />
            Add Item
          </Button>

          <ListItemText />
        </ListItem>
        <ListItem></ListItem>
        <ListItem>
          <Typography> Request utensils,straws,etc.</Typography>
          <input type="checkbox" />
        </ListItem>
        <ListItem>
          <input type="text" label="Add Notes" />
        </ListItem>
        {props.data.map((d) => (
          <ListItem>
            <Typography> {d.DISH_Name} </Typography>
            &nbsp;
            <Typography> ${d.Dish_Price} </Typography>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
