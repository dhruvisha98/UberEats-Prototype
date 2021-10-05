import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Navbardb from "../Navbar/Navbardb";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import image from "../Images/profileimage.jpeg";
import Axios from "axios";

export default function Profiles() {
  let customer = null;
  if (localStorage["customer"]) customer = JSON.parse(localStorage["customer"]);

  console.log(customer);
  const [name, setName] = useState(customer == null ? "" : customer.Cust_Name);
  const [nickname, setNickname] = useState(
    customer == null ? "" : customer.Cust_Nickname
  );
  const [email, setEmail] = useState(
    customer == null ? "" : customer.Cust_Email
  );
  const [city, setCity] = useState(customer == null ? "" : customer.Cust_City);
  const [state, setState] = useState(
    customer == null ? "" : customer.Cust_State
  );

  const handleSubmit = () => {
    Axios.put("http://localhost:5000/customer", {
      Cust_Name: name,
      Cust_Nickname: nickname,
      Cust_Email: email,
      Cust_City: city,
      Cust_State: state,
      Cust_ID: customer.Cust_ID,
    }).catch((err) => {
      console.log(err);
    });
  };
  return (
    <div>
      <div>
        <Navbardb />
      </div>
      <Grid container>
        <Grid item xs={6} md={4}>
          <Paper>
            <Container component="main" maxWidth="xs">
              {/* <CssBaseline /> */}
              <Box
                sx={{
                  //   marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box component="form" noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}></Grid>
                    <img src={image} alt="profile" />
                    <Grid container justifyContent="flex-end"></Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
            {/* </ThemeProvider> */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper>
            <Container component="main" maxWidth="xs">
              {/* <CssBaseline /> */}
              <Box
                sx={{
                  //   marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Profile
                </Typography>
                <Box noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="nname"
                        name="nickName"
                        required
                        fullWidth
                        id="nickName"
                        label="Nickname"
                        value={nickname}
                        onChange={(e) => {
                          setNickname(e.target.value);
                        }}
                        autoFocus
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        autoComplete="city"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="state"
                        label="State"
                        name="state"
                        autoComplete="state"
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel id="country">Country</InputLabel>
                      <Select
                        labelId="country"
                        id="country_select"
                        label="Country"
                        autoComplete="country"
                        nane="country"
                        fullWidth
                      >
                        <MenuItem>United States of America </MenuItem>
                        <MenuItem>Canada</MenuItem>
                        <MenuItem>India</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={handleSubmit}
                        style={{ background: "#b26a00" }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Save
                      </Button>
                    </Grid>

                    <Grid container justifyContent="flex-end"></Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
            {/* </ThemeProvider> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
