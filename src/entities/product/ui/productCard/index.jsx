import { Box, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "../productCard/styles.module.css";
import { useState } from "react";
import AddToCartButton from "../../../../features/cart/addToCart/ui/AddToCartButton";

const calcDiscountPercent = (price, discontPrice) =>
  Math.round(((price - discontPrice) / price) * 100);

function ProductCard({ product }) {
  // const percent = calcDiscountPercent(product.price, product.discont_price);

  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

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
          <AddToCartButton
            product={product}
            added={added}
            onAdded={() => setAdded(true)}
          />
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
