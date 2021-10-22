import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  FormControl,
  FormHelperText,
  InputLabel,
  Alert,
  Snackbar,
  Input,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Navbarls from "../Navbar/Navbarls";
import { Axios } from "../../axios";
import { Config } from "../../config";
import { useForm } from "react-hook-form";
const theme = createTheme();

export default function RSignUp() {
  const [success, setSuccess] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, delivery, location } = data;
    Axios.post(Config.url + "/restaurant", {
      Restaurant_Name: name,
      Restaurant_Email: email,
      Restaurant_Delivery_Mode: delivery,
      Restaurant_Location: location,
      Restaurant_Password: password,
    })
      .then((response) => {
        if (response.status === 200) {
          setRestaurantName(name);
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };
  //console.log(errors);
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
            noValidate
          >
            <FormControl
              error={
                errors.name?.type === "required"
                  ? true
                  : errors.name?.type === "minLength"
                  ? true
                  : errors.name?.type === "maxLength"
                  ? true
                  : false
              }
              variant="standard"
              fullWidth
            >
              <InputLabel htmlFor="component-name">Restaurant Name</InputLabel>
              <Input
                id="component-error-name"
                aria-describedby="component-error-text"
                placeholder="Name"
                {...register("name", {
                  required: true,
                  minLength: 2,
                  maxLength: 30,
                })}
              />
              <FormHelperText id="component-error-text">
                {errors.name?.type === "required"
                  ? "Restaurant Name is Required."
                  : errors.name?.type === "minLength"
                  ? "Restaurant Name is too short."
                  : errors.name?.type === "maxLength"
                  ? "Restaurant Name is too long."
                  : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              error={
                errors.email?.type === "required"
                  ? true
                  : errors.email?.type === "minLength"
                  ? true
                  : errors.email?.type === "pattern"
                  ? true
                  : false
              }
              variant="standard"
              fullWidth
            >
              <InputLabel htmlFor="component-email">
                Restaurant Email
              </InputLabel>
              <Input
                id="component-error-email"
                aria-describedby="component-error-text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  min: 3,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <FormHelperText id="component-error-text">
                {errors.email?.type === "required"
                  ? "Restaurant Email is Required."
                  : errors.email?.type === "minLength"
                  ? "Restaurant Email is too short."
                  : errors.email?.type === "pattern"
                  ? "This is an email."
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl
              error={
                errors.delivery?.type === "required"
                  ? true
                  : errors.delivery?.type === "minLength"
                  ? true
                  : errors.delivery?.type === "maxLength"
                  ? true
                  : false
              }
              variant="standard"
              fullWidth
            >
              <InputLabel htmlFor="component-delivery">
                Delivery Mode
              </InputLabel>
              <Input
                id="component-error-delivery"
                aria-describedby="component-error-text"
                placeholder="Delivery Mode"
                {...register("delivery", {
                  required: true,
                  minLength: 2,
                  maxLength: 30,
                })}
              />
              <FormHelperText id="component-error-text">
                {errors.delivery?.type === "required"
                  ? "Delivery Mode Name is Required."
                  : errors.delivery?.type === "minLength"
                  ? "Delivery Mode Name is too short."
                  : errors.delivery?.type === "maxLength"
                  ? "Delivery Mode Name is too long."
                  : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              error={
                errors.loaction?.type === "required"
                  ? true
                  : errors.loaction?.type === "minLength"
                  ? true
                  : errors.loaction?.type === "maxLength"
                  ? true
                  : false
              }
              variant="standard"
              fullWidth
            >
              <InputLabel htmlFor="component-loaction">Location</InputLabel>
              <Input
                id="component-error-loaction"
                aria-describedby="component-error-text"
                placeholder="Location"
                {...register("location", {
                  required: true,
                  minLength: 6,
                  maxLength: 30,
                })}
              />
              <FormHelperText id="component-error-text">
                {errors.loaction?.type === "required"
                  ? "Location is Required."
                  : errors.loaction?.type === "minLength"
                  ? "Location is too short."
                  : errors.loaction?.type === "maxLength"
                  ? "Location is too long."
                  : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              error={
                errors.password?.type === "required"
                  ? true
                  : errors.password?.type === "maxLength"
                  ? true
                  : errors.password?.type === "pattern"
                  ? true
                  : false
              }
              variant="standard"
              fullWidth
            >
              <InputLabel htmlFor="component-password">Password</InputLabel>
              <Input
                id="component-error-password"
                aria-describedby="component-error-text"
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: true,
                  maxLength: 80,
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                })}
              />
              <FormHelperText id="component-error-text">
                {errors.password?.type === "required"
                  ? "Password is Required."
                  : errors.password?.type === "maxLength"
                  ? "You can have only 80 characters."
                  : errors.password?.type === "pattern"
                  ? "Minimum eight characters, at least one letter, one number and one special character."
                  : ""}
              </FormHelperText>
            </FormControl>
            <Button
              style={{ background: "#b26a00" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {restaurantName} your Account has been created.
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
