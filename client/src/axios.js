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

export { Axios };
