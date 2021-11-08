import React, { useEffect, useState } from "react";
import { Config } from "../../config";
import { Axios } from "../../axios";
import RestaurantDetails from "./RestaurantDetails";
import { useParams } from "react-router-dom";

export default function RDashboard(props) {
  const [data, setData] = React.useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState({});

  const { id } = useParams();
  useEffect(() => {
    Axios.get(Config.url + "/menu/" + id).then((res) => {
      // console.log("HHHHHH");
      // console.log(res.data.RestaurantDishes);
      setData(res.data.RestaurantDishes);
      setImage(res.data.RestaurantImage);
      setName(res.data.RestaurantName);
      setDetail(res.data);
    });
  }, []);
  return (
    <RestaurantDetails
      restaurant_id={id}
      data={data}
      detail={detail}
      image={image}
      name={name}
      content={"dishes"}
      user={"customer"}
    />
  );
}
