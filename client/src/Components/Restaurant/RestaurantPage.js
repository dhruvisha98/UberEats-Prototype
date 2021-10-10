import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Cards from "../Card/Cards";
import { Config } from "../../config";
import { Axios } from "../../axios";
import RestaurantDetails from "./RestaurantDetails";
import {useParams} from "react-router-dom";


export default function RDashboard(props) {

  const [data,setData] = React.useState([]);

  const {id} = useParams();
  useEffect(() => {
    Axios.get(Config.url + "/menu/" + id)
    .then((res) =>{
      
      setData(res.data)
    })
  }, []);
  return (
    <RestaurantDetails restaurant_id={id} data={data} content={"dishes"} user={"customer"}/>
  );
}
