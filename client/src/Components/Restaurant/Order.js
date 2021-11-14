/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Cards from "../Card/Cards";
import { Axios } from "../../axios";
import { Config } from "../../config";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { Paper } from "@mui/material";
import { TableBody } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function RestaurantOrder(props) {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const history = useHistory();
  const [data, setData] = useState([]);
  const [dispID, setDispID] = useState(0);
  const [openCard, setOpenCard] = useState(false);
  const [dispOrder, setDispOrder] = useState({});
  const [status, setStatus] = useState("");
  const [filter, setFilter] = useState("All Orders");
  const [limit, setLimit] = useState("5");
  const [open, setOpen] = React.useState(false);
  const [temp, settemp] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFilter("All Orders");
    setOpenCard(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (e, id) => {
    ///// Update Order status query
    setStatus(e.target.value);
    Axios.put(Config.url + "/orderstatus", {
      status: e.target.value,
      id,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlefilter = (e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
    getFilteredOrderDetails(e.target.value);
  };

  const getFilteredOrderDetails = (orderStatus) => {
    console.log("orderstatus", orderStatus);
    if (orderStatus === "All Orders") {
      orderStatus = "";
    }
    Axios.get(Config.url + "/orderdetails/orderfilter", {
      params: {
        status: orderStatus,
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllOrderDetails = () => {
    Axios.get(Config.url + "/orderdetails")
      .then((res) => {
        // if (res.data.length === 0) {
        //   console.log("NO DATA AVAILABLE");
        // }
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    var resp_data = [];
    getFilteredOrderDetails(filter);
  }, [openCard]);

  // useEffect(() => {
  //   var resp_data = [];
  //   Axios.get(Config.url + "/orderdetails")
  //     .then((res) => {
  //       console.log(res.data);
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const cardStyle = {
    display: "block",
    width: "100%",
    height: "100%",
    margin: "20px",
  };

  const openDialog = (id, delStatus) => {
    setStatus(delStatus);
    console.log("dispid", id);
    const filtered = data.filter((item) => item._id === id);
    console.log(filtered);
    setDispOrder(filtered.length > 0 ? filtered[0] : null);
    setOpenCard(true);
  };

  return (
    <div>
      <Navbardb />
      <div>
        <center>
          <label>Order Status :</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={handlefilter}
          >
            <MenuItem value="All Orders">All Orders</MenuItem>
            <MenuItem value="Initialised">Order Recieved</MenuItem>
            <MenuItem value="Order Placed">Order Placed</MenuItem>
            <MenuItem value="Preparing">Preparing</MenuItem>
            <MenuItem value="On the way">On the way</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </center>
        <h1>{props.restaurant_id}</h1>
        {/* <Grid container> */}
        {data.map((d) => (
          <div>
            <Table style={{ marginLeft: "3%" }}>
              <tr>
                <td rowSpan="3" style={{ width: "20px", marginTop: "1%" }}>
                  <img
                    src={d.customer.CustomerImage}
                    style={{ width: "280px", height: "150px" }}
                  />
                </td>
                <div style={{ marginLeft: "5%", marginTop: "2%" }}>
                  <td textAlign="left">
                    {d?.customer?.CustomerName}
                    <br />
                    Order Status: {d.status}
                    <br />
                    Order Price: ${d?.finalOrderPrice}
                    <br />
                    <button
                      onClick={() => {
                        console.log("d", d._id);
                        settemp(d?.customer?.CustomerName);

                        openDialog(d?._id, d.delivery_status);
                      }}
                    >
                      View Reciept
                    </button>
                  </td>
                </div>
              </tr>
            </Table>

            <Modal
              open={openCard}
              onClose={() => {
                setOpenCard(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div style={{ textAlign: "center" }}>
                  <h2> {temp}</h2>
                </div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Dish Name</TableCell>
                          <TableCell>Dish Price</TableCell>
                          <TableCell>Qty</TableCell>
                          <TableCell>Total Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dispOrder?.dishes?.map((row) => (
                          <TableRow
                            key={row.Dish_ID}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell>{row?.name}</TableCell>
                            <TableCell>{row?.totalPrice / row.qty}</TableCell>
                            <TableCell>{row?.qty}</TableCell>
                            <TableCell>{row?.totalPrice}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Select
                    align="center"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    onChange={(e) => handleChange(e, dispOrder._id)}
                  >
                    <MenuItem value="Order Recieved">Order Recieved</MenuItem>
                    <MenuItem value="Preparing">Preparing</MenuItem>
                    <MenuItem value="On the way">On the way</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                  </Select>
                </Typography>
              </Box>
            </Modal>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {temp}
                </Typography>
              </Box>
            </Modal>
          </div>
        ))}
        {/* </Grid> */}
      </div>
    </div>
  );
}
