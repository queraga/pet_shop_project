import { Box, Button, Container, Typography, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "../../pages/homePage/styles.module.css";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/endpoints";
import { useForm } from "react-hook-form";
import saleBackgroundImg from "../../assets/images/saleBackgroundImg.svg";
import { pickRandom } from "../../utils/random";
import { getProducts } from "../../api/endpoints";

import heroBanner from "../../assets/images/heroBanner.svg";
import CategoryCard from "../../components/category/categoryCard";
import ProductCard from "../../components/product/productCard";

// form adjustments material UI
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
    borderColor: "rgba(255,255,255,0.8)",
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
  const [randomCategories, setRandomCategories] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const [randomSale, setRandomSale] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setRandomCategories(pickRandom(res.data, 4));
      })
      .catch((err) => console.log("categories error:", err));
  }, []);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const discounted = res.data.filter(
          (p) => p.discont_price !== null && p.discont_price < p.price,
        );
        setRandomSale(pickRandom(discounted, 4));
      })
      .catch((err) => console.log("products error:", err));
  }, []);

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
                background: "#0D50FF",
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
          {randomCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              title={cat.title}
              image={cat.image}
            />
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
      {/* Sale Block with 4 product card from sale */}
      <Box className={styles.saleSection}>
        <Box className={styles.saleHeader}>
          <Typography sx={{ fontSize: 64, fontWeight: 700, color: "#282828" }}>
            Sale
          </Typography>

          <Box className={styles.headerLine} />

          <Button
            component={NavLink}
            to="/sales"
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
            All sales
          </Button>
        </Box>

        <Box className={styles.saleGrid}>
          {randomSale.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
