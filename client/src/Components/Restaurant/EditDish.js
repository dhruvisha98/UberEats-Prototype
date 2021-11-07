import React, { useEffect, useState } from "react";
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
import { Config } from "../../config";

const theme = createTheme();

export default function EditDish(props) {
  const [dishReg, setDishReg] = useState("");
  const [priceReg, setPriceReg] = useState("");
  const [ingredientsReg, setIngredientsReg] = useState("");
  const [descriptionReg, setDescriptionReg] = useState("");
  const [categoryReg, setCategoryReg] = useState("");

  useEffect(() => {
    const dishID = props.match.params.id;
    Axios.get(Config.url + "/menu")
      .then((res) => {
        //console.log(res.data.RestaurantDishes);
        const filtered = res.data.RestaurantDishes?.filter(
          (item) => item._id == dishID
        );
        if (filtered.length > 0) {
          setDishReg(filtered[0]?.DishName);
          setPriceReg(filtered[0]?.DishPrice);
          setIngredientsReg(filtered[0]?.Ingredients);
          setDescriptionReg(filtered[0]?.DishDescription);
          setCategoryReg(filtered[0]?.DishCategory);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const save = () => {
    Axios.put(Config.url + "/menu", {
      Dish_ID: props.match.params.id,
      Dish_Name: dishReg,
      Dish_Price: priceReg,
      Ingredients: ingredientsReg,
      Dish_Description: descriptionReg,
      Dish_Category: categoryReg,
    }).then((response) => {
      console.log(response);
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
            Edit Dish
          </Typography>

          <Box
            component="form"
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="dish"
                  required
                  fullWidth
                  id="dish"
                  label="Dish Name"
                  autoFocus
                  value={dishReg}
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
                  value={priceReg}
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
                  value={ingredientsReg}
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
                  value={descriptionReg}
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
                  value={categoryReg}
                  onChange={(e) => {
                    setCategoryReg(e.target.value);
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
              onClick={save}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
