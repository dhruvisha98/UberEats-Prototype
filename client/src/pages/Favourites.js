import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Navbardb from "./Navbar/Navbardb";
import Favcards from "./Card/FavCard";

export default function Favourites() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/favourites", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
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
