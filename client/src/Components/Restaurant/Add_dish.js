import React, { useState, useCallback } from "react";
import {
  Button,
  CssBaseline,
  TextField,
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
  Select,
  MenuItem,
} from "@mui/material";
import Navbardb from "../Navbar/Navbardb";
import { Axios } from "../../axios";
import $ from "jquery";
import { Config } from "../../config";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
const theme = createTheme();

export default function Adddish() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [success, setSuccess] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const [dishReg, setDishReg] = useState("");
  const [priceReg, setPriceReg] = useState("");
  const [ingredientsReg, setIngredientsReg] = useState("");
  const [descriptionReg, setDescriptionReg] = useState("");
  const [categoryReg, setCategoryReg] = useState("");
  const [restIDReg, setRestIDReg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [trial, setTrial] = useState("Hello");

  const add = () => {
    Axios.post(Config.url + "/menu", {
      Dish_Name: dishReg,
      Dish_Price: priceReg,
      Ingredients: ingredientsReg,
      Dish_Description: descriptionReg,
      Dish_Category: categoryReg,
      Restaurant_ID: restIDReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const singleFileUploadHandler = () => {
    setTrial(selectedFile[0]);
    const data = new FormData(); // If file selected
    if ({ selectedFile }) {
      console.log(selectedFile);
      data.append("profileImage", selectedFile, selectedFile.name);

      Axios.post(Config.url + "/images/upload", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      })
        .then((response) => {
          console.log(response);
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
              let fileName = response.data;
              console.log("fileName", fileName);
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
  
  const onSubmit = (data) => {
    const { dish_name, dish_price, ingredients, dish_description, dish_type, dish_image } = data;
    let image_data = new FormData();
    image_data.append("profileImage", dish_image[0], dish_image[0].name);
    Axios.post(Config.url + "/images/upload", image_data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${image_data._boundary}`,
      },
    }).then((response) =>{
      console.log(response);
      // Axios.post(Config.url + "/menu", {
      //   Dish_Name: dishReg,
      //   Dish_Price: priceReg,
      //   Ingredients: ingredientsReg,
      //   Dish_Description: descriptionReg,
      //   Dish_Category: categoryReg,
      //   Restaurant_ID: restIDReg,
      // }).then((response) => {
      //   console.log(response);
      // });
    }).catch(() =>{

    });
    
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <FormControl
              error={
                errors.dish_name?.type === "required"
                  ? true
                  : errors.dish_name?.type === "minLength"
                  ? true
                  : errors.dish_name?.type === "maxLength"
                  ? true
                  : false
              }
              variant="standard"
              fullWidth
            >
              <InputLabel htmlFor="component-dish-name" required>
                Dish Name
              </InputLabel>
              <Input
                id="component-error-dish-name"
                aria-describedby="component-error-text"
                placeholder="Enter a Dish Name"
                {...register("dish_name", {
                  required: true,
                  minLength: 2,
                  maxLength: 30,
                })}
              />
              <FormHelperText id="component-error-text">
                {errors.dish_name?.type === "required"
                  ? "Dish Name is Required."
                  : errors.dish_name?.type === "minLength"
                  ? "Dish Name is too short."
                  : errors.dish_name?.type === "maxLength"
                  ? "Dish Name is too long."
                  : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              error={
                errors.dish_price?.type === "required"
                  ? true
                  : errors.dish_price?.type === "min"
                  ? true
                  : errors.dish_price?.type === "pattern"
                  ? true
                  : false
              }
              variant="standard"
              fullWidth
            >
              <InputLabel htmlFor="component-dish-price" required>
                Dish Price
              </InputLabel>
              <Input
                type="number"
                id="component-error-dish-price"
                aria-describedby="component-error-text"
                placeholder="Dish Price"
                {...register("dish_price", {
                  required: true,
                  min: 1,
                  pattern: /^\d*[1-9]\d*$/,
                })}
              />
              <FormHelperText id="component-error-text">
                {errors.dish_price?.type === "required"
                  ? "Dish Price is Required."
                  : errors.dish_price?.type === "min"
                  ? "Please add more then 1 or equal to 1."
                  : errors.dish_price?.type === "pattern"
                  ? "Enter only numeric values."
                  : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              error={
                errors.ingredients?.type === "required"
                  ? true
                  : errors.ingredients?.type === "maxLength"
                  ? true
                  : false
              }
              variant="standard"
              fullWidth
            >
              <InputLabel htmlFor="component-ingredients" required>
                Ingredients
              </InputLabel>
              <Input
                id="component-error-ingredients"
                aria-describedby="component-error-text"
                placeholder="Enter Dish Ingredients"
                {...register("ingredients", {
                  required: true,
                  maxLength: 250,
                })}
              />
              <FormHelperText id="component-error-text">
                {errors.ingredients?.type === "required"
                  ? "Ingredients is Required."
                  : errors.ingredients?.type === "maxLength"
                  ? "You can have only 250 characters."
                  : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              error={
                errors.dish_description?.type === "required"
                  ? true
                  : errors.dish_description?.type === "maxLength"
                  ? true
                  : false
              }
              variant="standard"
              fullWidth
            >
              <InputLabel htmlFor="component-dish-description" required>
                Dish Description
              </InputLabel>
              <Input
                id="component-error-dish-description"
                type="textarea"
                aria-describedby="component-error-text"
                placeholder="Enter Dish Description"
                {...register("dish_description", {
                  required: true,
                  maxLength: 600,
                })}
              />
              <FormHelperText id="component-error-text">
                {errors.ingredients?.type === "required"
                  ? "Ingredients is Required."
                  : errors.ingredients?.type === "maxLength"
                  ? "You can have only 600 characters."
                  : ""}
              </FormHelperText>
            </FormControl>
            <FormControl
              error={errors.ingredients?.type === "required" ? true : false}
              variant="standard"
              fullWidth
            >
              <InputLabel htmlFor="component-ingredients" required>
                Choose the type of dish
              </InputLabel>
              <Select
                id="component-type"
                placeholder="Choose the type of dish"
                {...register("dish_type", {
                  required: true,
                })}
                value={type}
                onChange={handleChange}
              >
                <MenuItem value={"veg"}>Veg</MenuItem>
                <MenuItem value={"non-veg"}>Non-Veg</MenuItem>
                <MenuItem value={"vegan"}>Vegan</MenuItem>
              </Select>
              <FormHelperText id="component-error-text">
                {errors.ingredients?.type === "required"
                  ? "Ingredients is Required."
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl
              error={errors.dish_image?.type === "required" ? true : false}
              variant="standard"
              fullWidth
            >
              <Input
                id="component-error-dish-image"
                type="file"
                aria-describedby="component-error-text"
                {...register("dish_image", {
                  required: true,
                })}
              />
              <FormHelperText id="component-error-text">
                {errors.dish_image?.type === "required"
                  ? "Dish Image is Required."
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
              Add a Dish
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
