/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Customer/Login";
import Signup from "./Customer/Signup";
import Profiles from "./Customer/Profiles";
import RSignup from "./Restaurant/RSignup";
import Adddish from "./Restaurant/Add_dish";
import RLogin from "./Restaurant/RLogin";
import RProfile from "./Restaurant/RProfile";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Navbar/Home";
import Favourites from "./Favourites/Favourites";
import RDashboard from "./Dashboard/RDashboard";
import RestaurantPage from "./Restaurant/RestaurantPage";
import OrderDetails from "./Order/OrderDetails";
import EditDish from "./Restaurant/EditDish";
import Order from "./Restaurant/Order";
import Checkout from "./Cart/Checkout";

export default function Main() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/profile" component={Profiles} />
        <Route exact path="/rsignup" component={RSignup} />
        <Route exact path="/rlogin" component={RLogin} />
        <Route exact path="/rprofile" component={RProfile} />
        <Route exact path="/adddish" component={Adddish} />
        <Route exact path="/edit/:id" component={EditDish} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/rdashboard" component={RDashboard} />
        <Route exact path="/favourites" component={Favourites} />
        <Route exact path="/restaurant/:id" component={RestaurantPage} />
        <Route exact path="/order" component={OrderDetails} />
        <Route exact path="/rorder" component={Order} />
        <Route exact path="/checkout/:oid" component={Checkout} />
      </Router>
    </div>
  );
}
