import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Cards from "../Card/Cards";
import { Axios } from "../../axios";
import { Config } from "../../config";

export default function RestaurantDetails(props) {
    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   const data = new FormData(event.currentTarget);
    //   // eslint-disable-next-line no-console
    //   console.log({
    //     email: data.get("email"),
    //     password: data.get("password"),
    //   });
    // };
  
    const history = useHistory();

    const addToCart = (id) =>{

        Axios.post(Config.url + "/cart",{"Dish_ID":id})
        .then((res) =>{
            alert("Added To Cart")
        })
        .catch((err) =>{

        });

    }
    return (
    <div>
        <Navbardb />
        <div>
            <h1>{props.restaurant_id}</h1>
            <container>
              <Grid container>
              {props.data.map((menu) => (
                  <Grid item key={menu.Dish_ID} xs={12} md={8} lg={4}>
                    <Cards 
                        content={"dish"} 
                        user={props.user} 
                        name={menu.Dish_Name}  
                        description={menu.Dish_Description} 
                        id={menu.Dish_ID} 
                        price={menu.Dish_Price} 
                        addToCart={addToCart}
                        />
                  </Grid>
                ))}
              </Grid>
            </container>
        </div>
      </div>
    )
}