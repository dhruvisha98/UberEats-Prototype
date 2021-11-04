import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Cards from "../Card/Cards";
import { Config } from "../../config";
import { Axios } from "../../axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [resType, setResType] = useState("");
  const [resMode, setResMode] = useState("");

  useEffect(() => {
    Axios.get(Config.url + "/restaurant")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(searchData);
    let url = Config.url + "/restaurant";
    if (searchData?.length > 3 || resType != "" || resMode != "") {
      url = Config.url + "/restaurant/search";
    }
    Axios.get(
      url,
      url.includes("search") && {
        params: { searchvalue: searchData, restype: resType, resmode: resMode },
      }
    )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchData, resType, resMode]);

  if (localStorage.getItem("user")) {
    return (
      <div>
        <Navbardb
          search={searchData}
          setSearch={setSearchData}
          resType={resType}
          setResType={setResType}
          resMode={resMode}
          setResMode={setResMode}
        />
        <div>
          <container>
            <Grid container>
              {data.map((restaurant) => (
                <Grid item key={restaurant._id} xs={12} md={8} lg={4}>
                  <Cards
                    content={"restaurant"}
                    user={"customer"}
                    name={restaurant.RestaurantName}
                    id={restaurant._id}
                    image={restaurant.RestaurantImage}
                    description={restaurant.RestaurantDescription}
                  />
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
