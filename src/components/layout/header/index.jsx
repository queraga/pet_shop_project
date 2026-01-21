import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import styles from "../header/styles.module.css";
import logo from "../../../assets/icons/logo.svg";
import basketEmpty from "../../../assets/icons/basketEmpty.svg";

function Header() {
  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ minHeight: 128, px: 0 }}>
        <Box className={styles.inner}>
          <NavLink to="/" className={styles.logo}>
            <img src={logo} alt="logo" />
          </NavLink>
          <Box className={styles.nav}>
            <NavLink to="/" className={linkClass}>
              Main Page
            </NavLink>
            <NavLink to="/categories" className={linkClass}>
              Categories
            </NavLink>
            <NavLink to="/products" className={linkClass}>
              All products
            </NavLink>
            <NavLink to="/sales" className={linkClass}>
              All sales
            </NavLink>
          </Box>
          <IconButton component={NavLink} to="/cart">
            <img src={basketEmpty} alt="cart" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
