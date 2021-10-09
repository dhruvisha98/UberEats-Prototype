import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbardb from "../Navbar/Navbardb";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import image from "../Images/profileimage.jpeg";
import { Axios } from "../../axios";
import { Config } from "../../config";

export default function RProfile() {
  let restaurant = null;
  if (localStorage["restaurant"])
    restaurant = JSON.parse(localStorage["restaurant"]);

  console.log(restaurant);
  const [name, setName] = useState(
    restaurant == null ? "" : restaurant.Restaurant_Name
  );

  const [email, setEmail] = useState(
    restaurant == null ? "" : restaurant.Restaurant_Email
  );
  const [des, setDes] = useState(
    restaurant == null ? "" : restaurant.Restaurant_Description
  );
  const [contact, setContact] = useState(
    restaurant == null ? "" : restaurant.Restaurant_Contact
  );
  const [type, setType] = useState(
    restaurant == null ? "" : restaurant.Restaurant_Type
  );
  const [time, setTime] = useState(
    restaurant == null ? "" : restaurant.Restaurant_Time
  );
  const [delivery, setDelivery] = useState(
    restaurant == null ? "" : restaurant.Restaurant_Delivery_Mode
  );
  const [day, setDay] = useState(
    restaurant == null ? "" : restaurant.Restaurant_Day
  );
  const [location, setLocation] = useState(
    restaurant == null ? "" : restaurant.Restaurant_Location
  );
  const handleSubmit = () => {
    Axios.put(Config.url + "/restaurant", {
      Restauarant_Name: name,
      Restauarant_Email: email,
      Restauarant_Description: des,
      Restauarant_Contact: contact,
      Restauarant_Type: type,
      Restauarant_Time: time,
      Restauarant_Delivery_Mode: delivery,
      Restauarant_Day: day,
      Restauarant_Location: location,
      Restaurant_ID: restaurant.Restaurant_ID,
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
                        autoComplete="des"
                        name="des"
                        required
                        fullWidth
                        id="des"
                        label="Description"
                        value={des}
                        onChange={(e) => {
                          setDes(e.target.value);
                        }}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="contact"
                        label="Contact"
                        name="contact"
                        autoComplete="contact"
                        value={contact}
                        onChange={(e) => {
                          setContact(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="type"
                        label="Type of Restaurant"
                        name="type"
                        autoComplete="type"
                        value={type}
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="time"
                        label="Time"
                        name="time"
                        autoComplete="time"
                        value={time}
                        onChange={(e) => {
                          setTime(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="delivery"
                        label="Delivery Mode"
                        name="delivery"
                        autoComplete="delivery"
                        value={delivery}
                        onChange={(e) => {
                          setDelivery(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="day"
                        label="Day"
                        name="day"
                        autoComplete="day"
                        value={day}
                        onChange={(e) => {
                          setDay(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
                        autoComplete="loaction"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                      />
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
