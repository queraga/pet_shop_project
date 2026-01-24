import { Box, Button, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "../../pages/homePage/styles.module.css";
import { useEffect } from "react";
import { getCategories } from "../../api/endpoints";
import { useState } from "react";

import heroBanner from "../../assets/images/heroBanner.svg";

const SERVER_URL = "http://localhost:3333";

function HomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("categories error:", err));
  }, []);

  const topCategories = categories.slice(0, 4);

  return (
    <>
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

      {/* Block with four Categories from /categories/all */}

      <Box className={styles.categoriesSection}>
        <Box className={styles.categoriesHeader}>
          <Typography sx={{ fontSize: 64, fontWeight: 700, color: "#282828" }}>
            Categories
          </Typography>
          <Box className={styles.headerLine} />

          <Button
            component={NavLink}
            to="/categories"
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              color: "#8B8B8B",
              borderColor: "#DDDDDD",
              "&:hover": {
                borderColor: "#8B8B8B",
                backgroundColor: "transparent",
              },
            }}
          >
            All categories
          </Button>
        </Box>

        <Box className={styles.categoriesGrid}>
          {topCategories.map((cat) => (
            <Box
              key={cat.id}
              component={NavLink}
              to={`/categories/${cat.id}`}
              className={styles.categoryCard}
            >
              <img
                src={`http://localhost:3333${cat.image}`}
                alt={cat.title}
                className={styles.categoryImg}
              />
              <Typography sx={{ mt: 2, fontSize: 20, color: "#282828" }}>
                {cat.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
