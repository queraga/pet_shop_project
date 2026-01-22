import { Box, Button, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "../../pages/homePage/styles.module.css";

import heroBanner from "../../assets/images/heroBanner.svg";

function HomePage() {
  return (
    <Box
      className={styles.banner}
      style={{
        backgroundImage: `url(${heroBanner})`,
      }}
    >
      <Container className={styles.container} maxWidth={false}>
        <Box className={styles.content}>
          <Typography
            sx={{
              color: "#fff",
              fontSize: 96,
              fontWeight: 700,
              lineHeight: "1.1",
            }}
          >
            Amazing Discounts
            <br />
            on Pets Products!
          </Typography>
          <Button
            component={NavLink}
            to="/sales"
            variant="contained"
            sx={{
              alignSelf: "flex-start",
              width: 218,
              height: 58,
              borderRadius: "6px",
              fontSize: "20px",
              textTransform: "none",
              mb: "25px",
            }}
          >
            Check out
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
