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
  const [status, setStatus] = useState();
  const [filter, setFilter] = useState("All Orders");
  const [limit, setLimit] = useState("5");

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
        console.log("res", res.data);
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
    getFilteredOrderDetails(status);
  }, []);

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
    setDispID(id);
    setStatus(delStatus);
    const filtered = data.filter((item) => item.order_id == id);
    setDispOrder(filtered.length > 0 && filtered[0]);
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
            <MenuItem value="Order Recieved">Order Recieved</MenuItem>
            <MenuItem value="Preparing">Preparing</MenuItem>
            <MenuItem value="On the way">On the way</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </center>
        <h1>{props.restaurant_id}</h1>
        <Grid container>
          {data.map((d) => (
            <div>
              <div style={{ marginLeft: "10%" }}>
                <Card
                  onClick={() => openDialog(d.order_id, d.delivery_status)}
                  style={cardStyle}
                >
                  <CardContent>
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={d.customer.CustomerImage}
                        style={{ width: "280px", height: "150px" }}
                      />
                      <h2>{d?.customer?.CustomerName}</h2>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Typography gutterBottom variant="h5" component="div">
                        Order Status: {d.status}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        Order Price: ${d?.finalOrderPrice}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                    <h2>{dispOrder?.customer?.CustomerName}</h2>
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
                    </Select>
                  </Typography>
                </Box>
              </Modal>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
}
