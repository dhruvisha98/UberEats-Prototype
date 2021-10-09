import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import logo from "../Images/logo.svg";
import image from "../Images/ubereats.png";

export default function Home() {
  const history = useHistory();

  const handleRoute = () => {
    history.push("/login");
  };

  const handleRoutes = () => {
    history.push("/signup");
    localStorage.setItem("user", "Customer");
  };

  const handleRSignup = () => {
    history.push("/rsignup");
  };

  const handleHome = () => {
    history.push("/");
  };

  // const handledashboard = () => {
  //   history.push("/dashboard");
  // };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleHome}>Home</MenuItem>
      {/* <MenuItem onClick={handleRoute}>Sign In</MenuItem> */}
      {/* <MenuItem onClick={handleRSignup}>Add Restuarant</MenuItem> */}
    </Menu>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ background: "#b26a00" }} position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleProfileMenuOpen}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "block", sm: "block" } }}
            >
              <img src={logo} alt="logo" />
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "block", md: "flex" } }}>
              <Button
                onClick={handleRoutes}
                color="inherit"
                variant="outlined"
                sx={{ mr: 2 }}
              >
                CUSTOMER
              </Button>
              <Button
                onClick={handleRSignup}
                color="inherit"
                variant="outlined"
              >
                RESTAURANT
              </Button>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
          </Toolbar>
        </AppBar>

        {renderMenu}
      </Box>

      <div>
        <img src={image} alt="Logo" height="910" width="1870" />
      </div>
    </div>
  );
}
