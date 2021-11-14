import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbardb from "../Navbar/Navbardb";
import Axios from "axios";
import $ from "jquery";
import { Config } from "../../config";
import { useHistory } from "react-router-dom";

const theme = createTheme();

export default function Adddish() {
  const [dishReg, setDishReg] = useState("");
  const [priceReg, setPriceReg] = useState("");
  const [ingredientsReg, setIngredientsReg] = useState("");
  const [descriptionReg, setDescriptionReg] = useState("");
  const [categoryReg, setCategoryReg] = useState("");
  const [restIDReg, setRestIDReg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dishImageUrl, setDishImageUrl] = useState("");
  const [trial, setTrial] = useState("Hello");

  const history = useHistory();

  const add = () => {
    Axios.post(Config.url + "/menu", {
      Dish_Name: dishReg,
      Dish_Price: priceReg,
      Ingredients: ingredientsReg,
      Dish_Description: descriptionReg,
      Dish_Category: categoryReg,
      Restaurant_ID: restIDReg,
      Dish_Image: dishImageUrl,
    }).then((response) => {
      console.log(response);
      history.push("/rdashboard");
    });
  };

  const singleFileUploadHandler = () => {
    setTrial(selectedFile[0]);
    const data = new FormData();
    // If file selected
    if ({ selectedFile }) {
      console.log(selectedFile);
      data.append("profileImage", selectedFile, selectedFile.name);

      Axios.post("http://localhost:5001/Images/upload", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      })
        .then((response) => {
          // console.log("image", response.data.location);

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
              setDishImageUrl(response.data.location);
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

  // ShowAlert Function
  const ocShowAlert = (message, background = "#3089cf") => {
    let alertContainer = document.querySelector("#oc-alert-container"),
      alertEl = document.createElement("div"),
      textNode = document.createTextNode(message);
    alertEl.setAttribute("class", "oc-alert-pop-up");
    $(alertEl).css("background", background);
    alertEl.appendChild(textNode);
    alertContainer.appendChild(alertEl);
    setTimeout(function () {
      $(alertEl).fadeOut("slow");
      $(alertEl).remove();
    }, 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbardb />
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
          <Typography component="h1" variant="h5">
            Add Dish
          </Typography>

          <Box
            component="form"
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="dish"
                  name="dish"
                  required
                  fullWidth
                  id="dish"
                  label="Dish Name"
                  autoFocus
                  onChange={(e) => {
                    setDishReg(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Dish Price"
                  name="price"
                  autoComplete="price"
                  onChange={(e) => {
                    setPriceReg(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ingredients"
                  label="Ingredients"
                  name="ingredients"
                  autoComplete="ingredients"
                  onChange={(e) => {
                    setIngredientsReg(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Dish Description"
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
                  id="category"
                  label="Veg, Non-Veg or Vegan"
                  name="category"
                  autoComplete="category"
                  onChange={(e) => {
                    setCategoryReg(e.target.value);
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
                  style={{ background: "#000000" }}
                >
                  Upload Image
                  <input type="file" hidden />
                </Button>
              </Grid>
            </Grid>
            <Button
              style={{ background: "#000000" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={add}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
