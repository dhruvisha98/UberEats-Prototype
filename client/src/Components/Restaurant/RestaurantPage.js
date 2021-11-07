import React, { useEffect } from "react";
import { Config } from "../../config";
import { Axios } from "../../axios";
import RestaurantDetails from "./RestaurantDetails";
import { useParams } from "react-router-dom";

export default function RDashboard(props) {
  const [data, setData] = React.useState([]);

  const { id } = useParams();
  useEffect(() => {
    Axios.get(Config.url + "/menu/" + id).then((res) => {
      console.log("HHHHHH");
      console.log(res.data.RestaurantDishes);
      setData(res.data.RestaurantDishes);
    });
  }, []);
  return (
    <RestaurantDetails
      restaurant_id={id}
      data={data}
      content={"dishes"}
      user={"customer"}
    />
  );
}
