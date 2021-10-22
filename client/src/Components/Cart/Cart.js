import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Axios } from "../../axios";
import { Config } from "../../config";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableBody } from "@mui/material";
import { Table } from "@mui/material";
import { Paper } from "@mui/material";

export default function Cart(props) {
  const [totalPrice, setTotalPrice] = React.useState(0);
  const orderCart = () => {
    Axios.post(Config.url + "/cart/order")
      .then((res) => {
        alert("Ordered");
        props.setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    let total = 0;
    props.data.forEach((item) => {
      total += parseInt(item.Dish_Price, 10);
    });
    console.log(total);
    setTotalPrice(total);
  }, []);

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
        {/* <ListItem>
          <Typography>Restaurant Name</Typography>
        </ListItem> */}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dish Name</TableCell>
                  <TableCell>Dish Description</TableCell>
                  <TableCell>Dish Price</TableCell>
                  <TableCell>Ingridients</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data?.map((d) => (
                  <TableRow
                    key={d.Dish_ID}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell>{d.Dish_Name}</TableCell>
                    <TableCell>{d.Dish_Description}</TableCell>
                    <TableCell>{d.Ingredients}</TableCell>
                    <TableCell>{d.Dish_Price}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>Total: </TableCell>
                  <TableCell>{totalPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Typography>

        <ListItem>
          <Button variant="outlined" onClick={orderCart}>
            Place Order
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}
