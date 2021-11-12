/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Cards from "../Card/Cards";
import { Config } from "../../config";
import { Axios } from "../../axios";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Modal } from "@mui/material";
import { Tab } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { Table } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { Paper } from "@mui/material";
const theme = createTheme();

export default function Checkout({ match }) {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [resType, setResType] = useState("");
  const [openCard, setOpenCard] = useState(false);
  const [address, setAddress] = useState("");
  const [resMode, setResMode] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    width: "500px",
    p: 4,
  };

  const handleAddress = () => {
    setOpenCard(true);
  };

  const getOrderDetails = () => {
    const oid = match.params.oid;
    Axios.get(Config.url + `/orderdetails/getOrderDetails/${oid}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewAddress = () => {
    console.log("IN ADD ADDRESS");
    console.log(address);
    Axios.put(Config.url + `/customer/addAddress`, { address })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div>
      <Navbardb
        search={searchData}
        setSearch={setSearchData}
        resType={resType}
        setResType={setResType}
        resMode={resMode}
        setResMode={setResMode}
      />
      <div>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Confirm Order
              </Typography>

              <Box
                component="form"
                // onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid item xs={12}>
                  <InputLabel id="Address"> Address</InputLabel>
                  <Select
                    labelId="Address"
                    id="Address"
                    label="Address"
                    autoComplete="Address"
                    nane="Address"
                    fullWidth
                    required
                    // onChange={(e) => {
                    //   setCountryReg(e.target.value);
                    // }}
                  >
                    <MenuItem value="Delivery"></MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="DeliveryType">Delivery Type</InputLabel>
                  <Select
                    labelId="DeliveryType"
                    id="DeliveryType"
                    label="Delivery Type"
                    autoComplete="DeliveryType"
                    nane="DeliveryType"
                    fullWidth
                    required
                    // onChange={(e) => {
                    //   setCountryReg(e.target.value);
                    // }}
                  >
                    {data?.delType === "Delivery" ? (
                      <MenuItem value="Delivery">Delivery</MenuItem>
                    ) : (
                      <MenuItem value="Pickup">Pickup</MenuItem>
                    )}
                  </Select>
                </Grid>
                <Button
                  style={{ background: "Grey" }}
                  alignItems="center"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleAddress}
                >
                  Add Address
                </Button>
                <TextField
                  fullWidth
                  id="Notes"
                  label="Notes"
                  name="Notes"
                  autoComplete="Notes"
                ></TextField>

                <Button
                  style={{ background: "#b26a00" }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  //   onClick={signup}
                >
                  Place Order
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
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
              Add Address
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  fullWidth
                  onChange={(e) => setAddress(e.target.value)}
                ></TextField>
              </Box>
              <Button
                style={{ background: "#b26a00" }}
                fullWidth
                variant="contained"
                onClick={addNewAddress}
                sx={{ mt: 3, mb: 2 }}
              >
                ADD
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
