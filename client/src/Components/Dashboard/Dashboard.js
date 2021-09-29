import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Cards from "../Card/Cards";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/restaurant", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/menu", { method: "GET" })
      .then((res) => res.json())
      .then((datas) => {
        setDatas(datas);
      });
  }, []);

  console.log(localStorage);
  if (localStorage.getItem("user")) {
    return (
      <div>
        <Navbardb />
        <div>
          <container>
            <Grid container>
              {data.map((restaurant) => (
                <Grid item key={restaurant.Restaurant_ID} xs={12} md={8} lg={4}>
                  <Cards restaurant={restaurant} />
                </Grid>
              ))}
            </Grid>
          </container>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbardb />
        <div>
          <container>
            <Grid container>
              {datas.map((restaurant) => (
                <Grid item key={restaurant.Restaurant_ID} xs={12} md={8} lg={4}>
                  <Cards restaurant={restaurant} />
                </Grid>
              ))}
            </Grid>
          </container>
        </div>
      </div>
    );
  }
}
