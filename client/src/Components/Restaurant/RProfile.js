import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Navbardb from "../Navbar/Navbardb";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import image from "../Images/profileimage.jpeg";
import { Axios } from "../../axios";
import { Config } from "../../config";

export default function RProfile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [trial, setTrial] = useState("Hello");
  let restaurant = null;
  if (localStorage["restaurant"])
    restaurant = JSON.parse(localStorage["restaurant"]);

  const [name, setName] = useState(
    restaurant == null ? "" : restaurant.Restaurant_Name
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
  const [image, setImage] = useState(
    restaurant == null ? "" : restaurant.Restaurant_Image
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
      Restaurant_Name: name,
      Restaurant_Description: des,
      Restaurant_Contact: contact,
      Restaurant_Type: type,
      Restaurant_Time: time,
      Restaurant_Delivery_Mode: delivery,
      Restaurant_Day: day,
      Restaurant_Location: location,
      Restaurant_Image: image,
      Restaurant_ID: restaurant.Restaurant_ID,
    };
    Axios.put(Config.url + "/restaurant", data)
      .then(() => {
        console.log(data);
        localStorage["restaurant"] = JSON.stringify(data);
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
