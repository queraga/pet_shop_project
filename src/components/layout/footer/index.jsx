import { Box, Container, Typography } from "@mui/material";
import styles from "../footer/styles.module.css";

import map from "../../../assets/images/map.svg";
import insta from "../../../assets/icons/insta.svg";
import whatsapp from "../../../assets/icons/whatsapp.svg";

function Footer() {
  return (
    <Box component="footer" className={styles.footer}>
      <Container className={styles.container} maxWidth={false}>
        <Typography variant="h3" className={styles.title}>
          Contact
        </Typography>
        <Box className={styles.grid}>
          <Box className={styles.card}>
            <Typography className={styles.label}>Phone</Typography>
            <Typography className={styles.value}>+49 30 915-88492</Typography>
          </Box>
          <Box className={styles.card}>
            <Typography className={styles.label}>Socials</Typography>
            <Box className={styles.socials}>
              <img src={insta} alt="instagram" />
              <img src={whatsapp} alt="whatsApp" />
            </Box>
          </Box>
          <Box className={styles.card}>
            <Typography className={styles.label}>Address</Typography>
            <Typography className={styles.value}>
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </Typography>
          </Box>
          <Box className={styles.card}>
            <Typography className={styles.label}>Working hours</Typography>
            <Typography className={styles.value}>24 hours a day</Typography>
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
