import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  const [data, setData] = useState([]);

  useEffect(() => {
    var resp_data = [];
    Axios.get(Config.url + "/orderdetails")
      .then((res) => {
        var i = 1;
        for (var e of res.data) {
          resp_data.push({
            order_no: i,
            order_dishes: e.Dish_Names.split(","),
          });
          i++;
        }
        setData(resp_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Navbardb />
      <div>
        <h1>{props.restaurant_id}</h1>
        <Grid container>
          {data.map((d) => (
            <div>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {d.order_no}
                  </Typography>
                  {d.order_dishes.map((o) => (
                    <div>{o}</div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
}
