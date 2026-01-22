import { Box, Container, Typography } from "@mui/material";
import styles from "../footer/styles.module.css";

import map from "../../../assets/images/map.svg";
import insta from "../../../assets/icons/insta.svg";
import whatsapp from "../../../assets/icons/whatsapp.svg";

function Footer() {
  const sxTitle = {
    fontSize: 64,
    fontWeight: 700,
    mb: "40px",
    color: "#282828",
  };
  const sxLabel = {
    fontSize: 20,
    fontWeight: 500,
    color: "#8b8b8b",
    mb: "12px",
  };
  const sxValue = { fontSize: 40, fontWeight: 600, color: "#282828" };

  return (
    <Box component="footer" className={styles.footer}>
      <Container className={styles.container} maxWidth={false}>
        <Typography sx={sxTitle}>Contact</Typography>
        <Box className={styles.grid}>
          <Box className={styles.card}>
            <Typography sx={sxLabel}>Phone</Typography>
            <Typography sx={sxValue}>+49 30 915-88492</Typography>
          </Box>
          <Box className={styles.card}>
            <Typography sx={sxLabel}>Socials</Typography>
            <Box className={styles.socials}>
              <img src={insta} alt="instagram" />
              <img src={whatsapp} alt="whatsApp" />
            </Box>
          </Box>
          <Box className={styles.card}>
            <Typography sx={sxLabel}>Address</Typography>
            <Typography sx={sxValue}>
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </Typography>
          </Box>
          <Box className={styles.card}>
            <Typography sx={sxLabel}>Working hours</Typography>
            <Typography sx={sxValue}>24 hours a day</Typography>
          </Box>
        </Box>
        <Box className={styles.location}>
          <img src={map} alt="Location" className={styles.mapImg} />
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
