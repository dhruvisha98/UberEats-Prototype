import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Cards from "../Card/Cards";
import Cart from "../Cart/Cart";
import { Config } from "../../config";
import axios from "axios";
import Axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleSearch = (search_data) => {
    setData(search_data.data.hits);
  };
  useEffect(() => {
    Axios.defaults.headers.common["Authorization"] = localStorage["jwt"];
    Axios.get(Config.url + "/restaurant")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    fetch(Config.url + "/menu", { method: "GET" })
      .then((res) => res.json())
      .then((datas) => {
        setDatas(datas);
      });
  }, []);

  console.log(localStorage);
  if (localStorage.getItem("user")) {
    return (
      <div>
        <Navbardb search={searchData} setSearch={handleSearch} />
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
