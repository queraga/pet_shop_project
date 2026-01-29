import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import styles from "../header/styles.module.css";
import logo from "../../../assets/icons/logo.svg";
import basketEmpty from "../../../assets/icons/basketEmpty.svg";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";

function Header() {
  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  const items = useSelector((state) => state.cart.items);
  const count = items.reduce((sum, x) => sum + x.qty, 0);

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

          <IconButton
            component={NavLink}
            to="/cart"
            disableRipple
            sx={{ "&:hover": { backgroundColor: "transparent" } }}
          >
            <Badge
              badgeContent={count}
              invisible={count === 0}
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#0D50FF",
                  color: "#fff",
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  fontSize: 12,
                  fontWeight: 700,
                  top: 18,
                  left: -16,
                },
              }}
            >
              <img src={basketEmpty} alt="cart" />
            </Badge>
            {/* {count > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  color: "red",
                  fontSize: 20,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {count}
              </Box>
              
            )} */}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
