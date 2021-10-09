import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Navbardb from "../Navbar/Navbardb";
import Favcards from "../Card/FavCard";
import { Config } from "../../config";
import { Axios } from "../../axios";
export default function Favourites() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(Config.url + "/favourites").then((res) => setData(res.data));
  }, []);
  return (
    <div>
      <Navbardb />
      <div>
        <container>
          <Grid container>
            {data.map((favourites) => (
              <Grid item key={favourites.Restaurant_ID} xs={12} md={8} lg={4}>
                <Favcards favourites={favourites} />
              </Grid>
            ))}
          </Grid>
        </container>
      </div>
    </div>
  );
}
