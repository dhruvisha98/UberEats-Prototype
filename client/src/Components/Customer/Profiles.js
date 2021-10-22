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
import { Axios } from "../../axios";
import { Config } from "../../config";

export default function Profiles() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [trial, setTrial] = useState("Hello");
  let customer = null;
  if (localStorage["customer"]) customer = JSON.parse(localStorage["customer"]);

  console.log(customer);
  const [country, setCountry] = useState(
    customer == null ? "" : customer.Cust_Country
  );
  const [name, setName] = useState(customer == null ? "" : customer.Cust_Name);
  const [nickname, setNickname] = useState(
    customer == null ? "" : customer.Cust_Nickname
  );
  const [email, setEmail] = useState(
    customer == null ? "" : customer.Cust_Email
  );
  const [phone, setPhone] = useState(
    customer == null ? "" : customer.Cust_Phone
  );
  const [city, setCity] = useState(customer == null ? "" : customer.Cust_City);
  const [state, setState] = useState(
    customer == null ? "" : customer.Cust_State
  );
  const [image, setImage] = useState(
    customer == null ? "" : customer.Cust_Image
  );

  const singleFileUploadHandler = () => {
    setTrial(selectedFile[0]);
    const data = new FormData();
    // If file selected
    if ({ selectedFile }) {
      console.log(selectedFile);
      data.append("profileImage", selectedFile, selectedFile.name);

      Axios.post("http://localhost:5000/Images/upload", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      })
        .then((response) => {
          console.log("image", response.data.location);

          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                console.log("File is too large.");
              } else {
                console.log(response.data); // If not the given file type
                console.log("File type not allowed");
              }
            } else {
              // Success
              // let fileName = response.data;
              // console.log("fileName", fileName);
              setImage(response.data.location);
            }
          }
        })
        .catch((error) => {
          // If another error
          console.log(error);
        });
    } else {
      // if file not selected throw error
      console.log("Please upload a file");
    }
  };
  const handleSubmit = () => {
    const data = {
      Cust_Name: name,
      Cust_Nickname: nickname,
      Cust_Email: email,
      Cust_Phone: phone,
      Cust_City: city,
      Cust_State: state,
      Cust_Country: country,
      Cust_Image: image,
      Cust_ID: customer.Cust_ID,
    };
    Axios.put(Config.url + "/customer", data)
      .then(() => {
        console.log(data);
        localStorage["customer"] = JSON.stringify(data);
      })
      .catch((err) => {
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
          <Paper style={{ "box-shadow": "0 0 0 0" }}>
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
          <Paper style={{ "box-shadow": "0 0 0 0" }}>
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
                        id="phone"
                        label="Contact Number"
                        name="phone"
                        autoComplete="phone"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
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
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                        value={country}
                      >
                        <MenuItem value="United States of America">
                          United States of America{" "}
                        </MenuItem>
                        <MenuItem value="Canada">Canada</MenuItem>
                        <MenuItem value="India">India</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <input
                        type="file"
                        onChange={(e) => {
                          setSelectedFile(e.target.files[0]);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={singleFileUploadHandler}
                        style={{ background: "#b26a00" }}
                      >
                        Upload Image
                        <input type="file" hidden />
                      </Button>
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
