import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Cards from "../Card/Cards";
import { Config } from "../../config";
import { Axios } from "../../axios";


export default function RDashboard() {

  const [data,setData] = React.useState([]);

  useEffect(() => {
    Axios.get(Config.url + "/menu")
      .then((res) => {

        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {

        console.log(err);
      });
  }, []);
  return (
    <div>
      <Navbardb />
      <div>
          <h1>ABCD</h1>
          <container>
            <Grid container>
            {data.map((menu) => (
                <Grid item key={menu.Dish_ID} xs={12} md={8} lg={4}>
                  <Cards content={"dish"} user={"restaurant"} name={menu.Dish_Name}  description={menu.Dish_Description} id={menu.Dish_ID} price={menu.Dish_Price} />
                </Grid>
              ))}
            </Grid>
          </container>
      </div>
    </div>
  );
}
