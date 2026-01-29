import { Box, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import errorMessage from "../../assets/images/errorMessage.svg";

function NotFoundPage() {
  return (
    <Box className={styles.container}>
      <Box className={styles.hero}>
        <img src={errorMessage} alt="dog" className={styles.dog} />
      </Box>
      <Typography
        sx={{
          fontSize: 64,
          fontWeight: 700,
          color: "#282828",
        }}
      >
        Page Not Found
      </Typography>

      <Typography className={styles.subtitle}>
        We’re sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage.
      </Typography>

      <Button
        component={NavLink}
        to="/"
        variant="contained"
        sx={{
          width: 209,
          height: 58,
          borderRadius: "6px",
          textTransform: "none",
          fontSize: 20,
          fontWeight: 600,
          mt: "32px",
          backgroundColor: "#0D50FF",
          "&:hover": { backgroundColor: "#282828" },
        }}
      >
        Go Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
