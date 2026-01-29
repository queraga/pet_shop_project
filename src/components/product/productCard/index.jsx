import { Box, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "../productCard/styles.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";

const calcDiscountPercent = (price, discontPrice) =>
  Math.round(((price - discontPrice) / price) * 100);

function ProductCard({ product }) {
  const dispatch = useDispatch();

  // const percent = calcDiscountPercent(product.price, product.discont_price);

  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    setAdded(true);
  };
  const hasDiscount =
    product.discont_price != null &&
    Number(product.discont_price) > 0 &&
    Number(product.price) > 0;

  const currentPrice = hasDiscount ? product.discont_price : product.price;

  const percent = hasDiscount
    ? calcDiscountPercent(Number(product.price), Number(product.discont_price))
    : null;

  return (
    <Box
      component={NavLink}
      to={`/products/${product.id}`}
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box className={styles.imgWrap}>
        <img
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
          className={styles.img}
        />
        {percent != null && <Box className={styles.badge}>-{percent}%</Box>}
        {(hovered || added) && (
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 282,
              height: 58,
              borderRadius: "6px",
              textTransform: "none",
              fontSize: "20px",
              fontWeight: 600,
              backgroundColor: added ? "#fff" : "#0D50FF",
              color: added ? "#282828" : "#fff",
              border: added ? "2px solid #282828" : "none",
              "&:hover": {
                backgroundColor: added ? "#fff" : "#282828",
              },
            }}
          >
            {added ? "Added" : "Add to Cart"}
          </Button>
        )}
      </Box>

      <Typography
        className={styles.title}
        noWrap
        sx={{
          fontSize: "20px",
          fontWeight: 500,
          mt: "16px",
        }}
      >
        {product.title}
      </Typography>
      <Box className={styles.priceRow}>
        <span className={styles.price}>${currentPrice}</span>
        {hasDiscount && (
          <span className={styles.oldPrice}>${product.price}</span>
        )}
      </Box>
    </Box>
  );
}

export default ProductCard;
