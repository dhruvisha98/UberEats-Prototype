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
import { useHistory } from "react-router-dom";
import { Axios } from "../../axios";
import { Config } from "../../config";
// import { config } from "aws-sdk";

const theme = createTheme();

export default function Login() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    Axios.post(Config.url + "/users/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data.message === "Success") {
          console.log("Empty");
          history.push("/dashboard");
        }
        console.log(response);
        localStorage["customer"] = JSON.stringify(response.data.result);
        localStorage["jwt"] = response.data.token;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const loginHelper = () => {
  //   console.log("testing!!");
  // };

  // const history = useHistory();
  // const handledashboard = () => {
  //   history.push("/dashboard");
  // };
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
            Sign In
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setUsername(e.target.value);
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
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              style={{ background: "#b26a00" }}
              type="button"
              fullWidth
              variant="contained"
              onClick={login}
              // onClick={loginHelper}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
