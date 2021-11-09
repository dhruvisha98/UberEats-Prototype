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
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

export default function Cart(props) {
  // Total Price for Order
  const [totalPrice, setTotalPrice] = React.useState(props.totPrice);
  const [qty, setQty] = React.useState("");

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

  const updateQuantity = (custId, cartItemId, qty) => {
    // console.log(custId, cartItemId, qty);
    Axios.put(Config.url + "/cart/updateCartQuantity", {
      cartItemId: cartItemId,
      qty: qty,
      custId: custId,
    })
      .then((res) => {
        console.log(res.data);
        setQty(res.data.qty);
        setTotalPrice(res.data.totPrice);
        props.handleOpenCart(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCartItem = (id) => {
    Axios.put(Config.url + "/cart/deleteCartItem", { cartItemId: id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    let total = 0;
    props.data.forEach((item) => {
      total += parseInt(item.totalPrice, 10);
      // console.log(total);
    });
    setTotalPrice(total);
  }, [qty]);
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
                  <TableCell>Quantity</TableCell>
                  <TableCell>Dish Total Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data &&
                  props.data.length > 0 &&
                  props.data?.map((d) => (
                    <TableRow
                      key={d.Dish_ID}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>{d.name}</TableCell>
                      <TableCell>
                        <InputLabel
                          style={{ marginLeft: "2%" }}
                          size="small"
                          id="country"
                        ></InputLabel>
                        <Select
                          labelId="qty"
                          id="qty_select"
                          autoComplete="qty"
                          name="qty"
                          required
                          value={d.qty}
                          onChange={(e) => {
                            // console.log(e.target.value);
                            setQty(e.target.value);
                            updateQuantity(d.custId, d._id, e.target.value);
                          }}
                        >
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>${d.totalPrice}</TableCell>
                      <TableCell>
                        <Button onClick={() => deleteCartItem(d._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>Total: </TableCell>
                  <TableCell>{props.totPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Typography>

        <ListItem>
          <div style={{ alignItems: "center" }}>
            <Button variant="outlined" onClick={orderCart}>
              Place Order
            </Button>
          </div>
        </ListItem>
      </List>
    </Dialog>
  );
}
