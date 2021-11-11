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
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

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

  const history = useHistory();
  const [data, setData] = useState([]);
  const [dispID, setDispID] = useState(0);
  const [openCard, setOpenCard] = useState(false);
  const [status, setStatus] = useState(null);
  const [dispOrder, setDispOrder] = useState({});

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

  const handlechange = (event) => {
    setStatus(event.target.value);
    console.log(event.target.value);
    getFilteredOrderDetails(event.target.value);
    // Axios.get(Config.url + "/orderdetails/orderfilter", {
    //   params: {
    //     status: event.target.value,
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const getFilteredOrderDetails = (orderStatus) => {
    if (orderStatus === null || orderStatus === undefined) {
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
        if (res.data.length === 0) {
          console.log("NO DATA AVAILABLE");
        }
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("data", data);
  useEffect(() => {
    var resp_data = [];
    getFilteredOrderDetails(status);
  }, []);
  const cardStyle = {
    display: "block",
    width: "100%",
    height: "100%",
    margin: "20px",
  };

  const openDialog = (id) => {
    setDispID(id);
    const filtered = data.filter((item) => item._id == id);
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
            value={status}
            onChange={handlechange}
          >
            <MenuItem value={null}>All Orders</MenuItem>
            <MenuItem value="Order Recieved">Order Recieved</MenuItem>
            <MenuItem value="Preparing">Preparing</MenuItem>
            <MenuItem value="On the way">On the way</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </center>
        <h1>{props.restaurant_id}</h1>
        <Grid container>
          {data?.map((d) => (
            <div style={{ textAlign: "center" }}>
              <Card onClick={() => openDialog(d._id)} style={cardStyle}>
                <CardContent>
                  <h2 style={{ textAlign: "center" }}>
                    {d?.restaurant.RestaurantName}
                  </h2>
                  <Typography gutterBottom variant="h5" component="div">
                    Total Order Price: ${d?.finalOrderPrice}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Order Status:{d?.status}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Order Time:{" "}
                    {d?.createdAt ? new Date(d.createdAt).getHours() : null}:
                    {d?.createdAt ? new Date(d.createdAt).getMinutes() : null}
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
                    style={{ textAlign: "center" }}
                  >
                    {dispOrder?.restaurant?.RestaurantName}
                  </Typography>
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
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.totalPrice / row.qty}</TableCell>
                              <TableCell>{row.qty}</TableCell>
                              <TableCell>{row.totalPrice}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                  <div style={{ textAlign: "right", marginTop: "3%" }}>
                    Tax : ${dispOrder?.tax} <br />
                    Final Price: ${dispOrder?.finalOrderPrice}
                  </div>
                </Box>
              </Modal>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
}
