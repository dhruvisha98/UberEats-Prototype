import Axios from "axios";

Axios.interceptors.request.use(
  (req) => {
    console.log("hello");
    if (localStorage["jwt"])
      req.headers = {
        Authorization: localStorage["jwt"],
      };
    return req;
  },
  (err) => {
    console.log("err");
    console.log(err);
    return Promise.reject(err);
  }
);
Axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 403)
      window.location.href = "http://localhost:3000";
    else if(err.response.status === 401)
    {
      console.log("Error occured");
      window.location.href = "http://localhost:3000";
    }
    return Promise.reject(err);

  }
);

export { Axios };
