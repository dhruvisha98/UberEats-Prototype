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
    console.log(id);

    Axios.put(Config.url + "/orderstatus", {
      Delivery_Status: e.target.value,
      Order_ID: id,
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
    if (
      orderStatus === null ||
      orderStatus === "All Orders" ||
      orderStatus === undefined
    ) {
      getAllOrderDetails();
      return;
    }

    Axios.get(Config.url + "/orderdetails/orderfilter", {
      params: {
        status: orderStatus,
      },
    })
      .then((res) => {
        console.log(res);
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

  console.log(data);
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
    width: "400px",
    height: "500px",
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
              <Card
                onClick={() => openDialog(d.order_id, d.delivery_status)}
                style={cardStyle}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {d.order_id}
                  </Typography>

                  <Typography gutterBottom variant="h5" component="div">
                    Name: {d.customer_name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Description:{d.restaurant_desc}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {d.restaurant_cont}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Order Status:{d.order_status}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Delivery Status:{d.delivery_status}
                  </Typography>
                </CardContent>
              </Card>
              <Modal
                open={openCard}
                onClose={() => {
                  setOpenCard(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {dispOrder.order_id} : Order for {dispOrder.customer_name}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Dish ID</TableCell>
                            <TableCell>Dish Name</TableCell>
                            <TableCell>Dish Description</TableCell>
                            <TableCell>Dish Price</TableCell>
                            <TableCell>Ingridients</TableCell>
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
                              <TableCell component="th" scope="row">
                                {row.Dish_ID}
                              </TableCell>
                              <TableCell>{row.Dish_Name}</TableCell>
                              <TableCell>{row.Dish_Description}</TableCell>
                              <TableCell>{row.Dish_Price}</TableCell>
                              <TableCell>{row.Ingredients}</TableCell>
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
                      onChange={(e) => handleChange(e, dispOrder.order_id)}
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
