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
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Stack } from "@mui/material";
import { Pagination } from "@mui/material";

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
  const [status, setStatus] = useState("All Orders");
  const [dispOrder, setDispOrder] = useState({});
  const [limit, setLimit] = useState("5");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  console.log("Props", props);
  const cancelOrder = (id) => {
    ///// Update Order status query

    Axios.put(Config.url + "/orderstatus", {
      status: "Cancelled",
      id,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
    if (orderStatus === "All Orders") {
      orderStatus = "";
    }
    Axios.get(Config.url + "/orderdetails/orderfilter", {
      params: {
        status: orderStatus,
        limit,
        page,
      },
    })
      .then((res) => {
        setData(res.data.filteredOrders);
        setTotalPages(res.data.totalPages);
        setPage(res.data.currentPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getAllOrderDetails = () => {
  //   Axios.get(Config.url + "/orderdetails")
  //     .then((res) => {
  //       if (res.data.length === 0) {
  //         console.log("NO DATA AVAILABLE");
  //       }
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  useEffect(() => {
    var resp_data = [];
    getFilteredOrderDetails(status);
  }, [limit, page]);
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
          <div>
            <Stack spacing={2}>
              <Typography>Page: {page}</Typography>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </div>
          <Select
            align="center"
            labelId="limit"
            id="limit"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          >
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
          </Select>
          <label>Order Status :</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            onChange={handlechange}
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
          {data?.map((d) => (
            <div style={{ textAlign: "center" }}>
              <div style={{ marginLeft: "10%" }}>
                <Card style={cardStyle}>
                  <div onClick={() => openDialog(d._id)}>
                    <CardContent>
                      <img
                        src={d.restaurant.RestaurantImage}
                        style={{ width: "280px", height: "150px" }}
                      />
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
                        {d?.createdAt ? new Date(d.createdAt).getHours() : null}
                        :
                        {d?.createdAt
                          ? new Date(d.createdAt).getMinutes()
                          : null}
                      </Typography>
                    </CardContent>
                  </div>

                  <div>
                    <center>
                      {d?.status === "Order Recieved" ? (
                        <Button
                          variant="outlined"
                          onClick={() => cancelOrder(d?._id)}
                        >
                          Cancel
                        </Button>
                      ) : null}
                    </center>
                  </div>
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
