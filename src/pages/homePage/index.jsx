import { Box, Button, Container, Typography, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "../../pages/homePage/styles.module.css";
import { useEffect } from "react";
import { getCategories } from "../../api/endpoints";
import { useState } from "react";
import { useForm } from "react-hook-form";
import saleBackgroundImg from "../../assets/images/saleBackgroundImg.svg";

import heroBanner from "../../assets/images/heroBanner.svg";

const promoInputSx = {
  "& .MuiOutlinedInput-root": {
    height: "58px",
    borderRadius: "6px",
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: 500,
    color: "#fff",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.4)",
    borderWidth: "2px",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },

  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
    borderWidth: "2px",
  },

  "& .MuiOutlinedInput-root.Mui-focused": {
    boxShadow: "none",
  },

  "& .MuiInputBase-input::placeholder": {
    color: "rgba(255,255,255,0.8)",
    opacity: 1,
  },
};

const SERVER_URL = "http://localhost:3333";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("categories error:", err));
  }, []);

  const topCategories = categories.slice(0, 4);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", phone: "", email: "" },
  });

  const onSubmit = () => {
    setSubmitted(true);
    reset();
  };

  return (
    <>
      {/* HeroBanner */}
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

      {/* Form for 5% discount */}
      <Box className={styles.promoSection}>
        <Box className={styles.promo}>
          <Typography
            className={styles.promoTitle}
            sx={{
              fontSize: "64px",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            5% off on the first order
          </Typography>
          <img
            src={saleBackgroundImg}
            alt="Discount"
            className={styles.backgroundImg}
          />
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className={styles.promoForm}
          >
            <TextField
              placeholder="Name"
              variant="outlined"
              size="small"
              {...register("name")}
              sx={promoInputSx}
            />
            <TextField
              placeholder="Phone number"
              variant="outlined"
              size="small"
              {...register("phone")}
              sx={promoInputSx}
            />
            <TextField
              placeholder="Email"
              variant="outlined"
              size="small"
              {...register("email")}
              sx={promoInputSx}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                mt: "32px",
                height: 58,
                borderRadius: "6px",
                fontSize: 20,
                textTransform: "none",
                backgroundColor: submitted ? "#282828" : "#fff",
                color: submitted ? "#fff" : "#282828",
                "&:hover": {
                  backgroundColor: submitted ? "#222" : "#b7c9f8",
                },
              }}
            >
              Get a discount
            </Button>
            {submitted && (
              <Typography
                sx={{
                  mt: 2,
                  fontSize: 20,
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Request Submitted
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
