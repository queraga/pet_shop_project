import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { getProductById } from "../../api/endpoints";
import styles from "../productPage/styles.module.css";
import { NavLink } from "react-router-dom";

const calcDiscountPercent = (price, discontPrice) =>
  Math.round(((price - discontPrice) / price) * 100);

function ProductPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleInc = () => setQty((v) => v + 1);

  const handleDec = () => setQty((v) => (v > 1 ? v - 1 : 1));

  const handleAdd = () => {
    for (let i = 0; i < qty; i += 1) {
      dispatch(addToCart(product));
    }
    setAdded(true);
  };

  useEffect(() => {
    getProductById(productId)
      .then((res) => {
        setProduct(res.data?.[0] ?? null);
        setQty(1);
        setAdded(false);
      })
      .catch((err) => console.log("product error:", err));
  }, [productId]);

  if (!product) return null;

  const hasDiscount =
    product.discont_price != null &&
    Number(product.discont_price) > 0 &&
    Number(product.price) > 0;

  const currentPrice = hasDiscount ? product.discont_price : product.price;

  const percent = hasDiscount
    ? calcDiscountPercent(Number(product.price), Number(product.discont_price))
    : null;

  return (
    <Box className={styles.container}>
      <Box className={styles.breadcrumbs}>
        <Box className={styles.breadcrumbs}>
          <NavLink to="/" className={styles.crumb}>
            Main page
          </NavLink>

          <NavLink to="/categories" className={styles.crumb}>
            Categories
          </NavLink>

          <NavLink
            to={`/categories/${product.categoryId}`}
            className={styles.crumb}
          >
            Dry & Wet Food
          </NavLink>

          <span className={styles.crumbActive}>
            {product.title.split(" ").slice(0, 2).join(" ")}
          </span>
        </Box>
      </Box>

      <Box className={styles.layout}>
        <Box className={styles.imgWrap}>
          <img
            src={`http://localhost:3333${product.image}`}
            alt={product.title}
            className={styles.img}
          />
        </Box>

        <Box className={styles.info}>
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.1,
              mb: "32px",
              color: "#282828",
            }}
          >
            {product.title}
          </Typography>

          <Box className={styles.priceRow}>
            <span className={styles.price}>${currentPrice}</span>

            {hasDiscount && (
              <>
                <span className={styles.oldPrice}>${product.price}</span>
                <span className={styles.percentBadge}>-{percent}%</span>
              </>
            )}
          </Box>

          <Box className={styles.actionsRow}>
            <Box className={styles.qty}>
              <button className={styles.qtyBtn} onClick={handleDec}>
                -
              </button>
              <span className={styles.qtyValue}>{qty}</span>
              <button className={styles.qtyBtn} onClick={handleInc}>
                +
              </button>
            </Box>

            <Button
              variant="contained"
              onClick={handleAdd}
              sx={{
                height: 58,
                borderRadius: "6px",
                textTransform: "none",
                fontSize: 20,
                fontWeight: 600,
                backgroundColor: added ? "#fff" : "#0D50FF",
                color: added ? "#282828" : "#fff",
                border: added ? "2px solid #282828" : "none",
                "&:hover": { backgroundColor: added ? "#fff" : "#282828" },
              }}
              className={styles.addBtn}
            >
              {added ? "Added" : "Add to cart"}
            </Button>
          </Box>

          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              mb: "16px",
            }}
          >
            Description
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: 1.3,
            }}
          >
            {product.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductPage;
