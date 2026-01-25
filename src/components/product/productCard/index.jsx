import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "../productCard/styles.module.css";

const calcDiscountPercent = (price, discontPrice) =>
  Math.round(((price - discontPrice) / price) * 100);

function ProductCard({ product }) {
  const percent = calcDiscountPercent(product.price, product.discont_price);

  return (
    <Box
      component={NavLink}
      to={`/products/${product.id}`}
      className={styles.card}
    >
      <Box className={styles.imgWrap}>
        <img
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
          className={styles.img}
        />
        <Box className={styles.badge}>-{percent}%</Box>
      </Box>
      <Typography className={styles.title} noWrap>
        {product.title}
      </Typography>
      <Box className={styles.priceRow}>
        <span className={styles.price}>${product.discont_price}</span>
        <span className={styles.oldPrice}>${product.price}</span>
      </Box>
    </Box>
  );
}

export default ProductCard;
