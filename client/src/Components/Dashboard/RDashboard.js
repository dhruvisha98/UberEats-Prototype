import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Cards from "../Card/Cards";
import { Config } from "../../config";
import { Axios } from "../../axios";
import RestaurantDetails from "../Restaurant/RestaurantDetails";

export default function RDashboard() {
  const [data, setData] = React.useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState({});

  useEffect(() => {
    Axios.get(Config.url + "/menu")
      .then((res) => {
        setData(res.data.RestaurantDishes);
        setImage(res.data.RestaurantImage);
        setName(res.data.RestaurantName);
        setDetail(res.data);
        console.log("Res DATA", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <RestaurantDetails
      data={data}
      image={image}
      name={name}
      detail={detail}
      user={"restaurant"}
    />
  );
}
