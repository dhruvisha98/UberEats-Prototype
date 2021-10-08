import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
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

  return (
    <Dialog open={props.open}>
      <CloseIcon
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
          <input type="text" value="Add Notes" />
        </ListItem>
        {props.data.map((d) => (
          <ListItem>
            <Typography> {d.DISH_Name}</Typography>
            <Typography> {d.Dish_Price}</Typography>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
