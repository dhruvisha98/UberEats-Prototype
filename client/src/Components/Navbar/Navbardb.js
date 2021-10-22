import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useHistory } from "react-router-dom";
import logo from "../Images/logo.svg";
import { Button } from "@mui/material";
import { Axios } from "../../axios";
import Cart from "../Cart/Cart";
import { Config } from "../../config";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { ToggleButtonGroup } from "@mui/material";
import { ToggleButton } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [searchTxt, setSearchTxt] = React.useState("");
  const [openCart, setOpenCart] = React.useState(false);
  const [resType, setResType] = React.useState("");
  const [resMode, setResMode] = React.useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const history = useHistory();

  const [cartData, setCartData] = React.useState([]);
  const handleHome = () => {
    history.push("/");
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    localStorage.removeItem(["customer"]);
  };

  const handleChange = (txt) => {
    let text = txt.target.value;
    props.setSearch(text);
  };

  const handleVeg = () => {
    Axios.get(Config.url + "/menu/check/Veg")
      .then((res) => {
        //console.log(res);
        console.log("Veg");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleType = (txt) => {
  //   let text = txt.target.value;
  //   setType(text);
  //   Axios.post(Config.url + "/restaurant/searchResult", { Search: text })
  //     .then((res) => {
  //       //console.log(res);
  //       props.setSearch(res);
  //       console.log(props);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   //CAll API
  // };
  const handleDashboard = () => {
    if (localStorage.getItem("user")) {
      history.push("/dashboard");
    } else {
      history.push("/rdashboard");
    }
  };

  // const handleRoute = () => {
  //   history.push("/login");
  // };

  const handleProfile = () => {
    if (localStorage.getItem("user")) {
      history.push("/profile");
    } else {
      history.push("/rprofile");
    }
  };

  const handleResType = (e, rt) => {
    props.setResType(rt);
  };

  const handleResMode = (e, rm) => {
    props.setResMode(rm);
  };
  const handleOrder = () => {
    history.push("/rorder");
  };

  const handleFav = () => {
    history.push("/favourites");
  };

  const handleOrders = () => {
    history.push("/order");
  };
  const handleAdddish = () => {
    history.push("/adddish");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpenCart = () => {
    Axios.get(Config.url + "/cart/get")
      .then((res) => {
        console.log(res.data);
        setCartData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenCart(true);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleHome}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      //   anchorOrigin={{
      //     vertical: "top",
      //     horizontal: "right",
      //   }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleDashboard}>Home</MenuItem>
      {/* <MenuItem onClick={handleRoute}>Sign In</MenuItem> */}
      {/* <MenuItem onClick={handleRSignup}>Add Restuarant</MenuItem> */}
    </Menu>
  );
  if (localStorage.getItem("user")) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ background: "#b26a00" }} position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileMenuOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            ></Typography>
            <img src={logo} alt="logo" />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={props.search}
                onChange={handleChange}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <ToggleButtonGroup
              value={props.resType}
              exclusive
              onChange={handleResType}
              sx={{ mr: 2 }}
            >
              <ToggleButton value="Veg">Veg</ToggleButton>
              <ToggleButton value="Non-Veg">Non-Veg</ToggleButton>
              <ToggleButton value="Vegan">Vegan</ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              value={props.resMode}
              exclusive
              onChange={handleResMode}
            >
              <ToggleButton value="Pickup">Pickup</ToggleButton>
              <ToggleButton value="Delivery">Delivery</ToggleButton>
            </ToggleButtonGroup>
            {/* <label for="type">Type: &nbsp; </label> */}

            {/* <select
              size="large"
              aria-label="type"
              color="inherit"
              name="type"
              id="type"
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Vegan">Vegan</option>
            </select> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "block", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="favourite"
                color="inherit"
                onClick={handleFav}
              >
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="favourite"
                color="inherit"
                onClick={handleOrders}
              >
                <ReceiptIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="cart"
                color="inherit"
                onClick={(e) => {
                  handleOpenCart(true);
                }}
              >
                <ShoppingCartIcon />
              </IconButton>

              <Cart open={openCart} setOpen={setOpenCart} data={cartData} />

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ background: "#b26a00" }} position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileMenuOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            ></Typography>
            <img src={logo} alt="logo" />

            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              aria-label="order"
              color="inherit"
              onClick={handleOrder}
            >
              <ReceiptIcon />
            </IconButton>

            <Button color="inherit" variant="outlined" onClick={handleAdddish}>
              Add Dish
            </Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
  }
}
