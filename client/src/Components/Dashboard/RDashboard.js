import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Cards from "../Card/Cards";
import { Config } from "../../config";
import { Axios } from "../../axios";
import RestaurantDetails from "../Restaurant/RestaurantDetails";


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
    <RestaurantDetails data={data} user={"restaurant"}/>
  );
}
