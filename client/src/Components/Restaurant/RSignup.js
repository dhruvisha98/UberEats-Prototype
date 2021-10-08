import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbarls from "../Navbar/Navbarls";
import Axios from "axios";
import { Config } from "../../config";

const theme = createTheme();

export default function RSignUp() {
  const [nameReg, setNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [contactReg, setContactReg] = useState("");
  const [descriptionReg, setDescriptionReg] = useState("");
  const [locationReg, setLocationReg] = useState("");
  const [typeReg, setTypeReg] = useState("");
  const [timeReg, setTimeReg] = useState("");
  const [deliveryReg, setDeliveryReg] = useState("");
  const [dayReg, setDayReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const rsignup = () => {
    Axios.post(Config.url + "/restaurant", {
      Restaurant_Name: nameReg,
      Restaurant_Email: emailReg,
      Restaurant_Description: descriptionReg,
      Restaurant_Contact: contactReg,
      Restaurant_Type: typeReg,
      Restaurant_Time: timeReg,
      Restaurant_Delivery: deliveryReg,
      Restaurant_Day: dayReg,
      Restaurant_Location: locationReg,
      Restaurant_Password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbarls />
      </div>
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
          <Avatar style={{ background: "#b26a00" }} xsx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Restaurant Sign up
          </Typography>

          <Box
            component="form"
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="rname"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Restaurant Name"
                  autoFocus
                  onChange={(e) => {
                    setNameReg(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setEmailReg(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  onChange={(e) => {
                    setDescriptionReg(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="Mobile Number"
                  name="contact"
                  autoComplete="contact"
                  onChange={(e) => {
                    setContactReg(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="type"
                  label="Veg, Non-Veg or Vegan"
                  name="type"
                  autoComplete="type"
                  onChange={(e) => {
                    setTypeReg(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="time"
                  label="Time ( HH:MM:SS )"
                  name="time"
                  autoComplete="time"
                  onChange={(e) => {
                    setTimeReg(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="delivery"
                  label="Delivery-Mode"
                  name="delivery"
                  autoComplete="delivery"
                  onChange={(e) => {
                    setDeliveryReg(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="day"
                  label="Days ( From - To )"
                  name="day"
                  autoComplete="day"
                  onChange={(e) => {
                    setDayReg(e.target.value);
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
                  autoComplete="location"
                  onChange={(e) => {
                    setLocationReg(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              style={{ background: "#b26a00" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={rsignup}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <a href="/RLogin" variant="body2">
                  Already have an account? Sign in
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
