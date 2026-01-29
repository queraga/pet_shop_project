import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { getProducts } from "../../api/endpoints";
import ProductCard from "../../components/product/productCard";
import styles from "./styles.module.css";

function DiscountedPage() {
  const [products, setProducts] = useState([]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    getProducts()
      .then((res) => {
        const discounted = res.data.filter((p) => p.discont_price != null);
        setProducts(discounted);
      })
      .catch((err) => console.log("products error:", err));
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    const fromNum = from === "" ? null : Number(from);
    const toNum = to === "" ? null : Number(to);

    if (fromNum != null && !Number.isNaN(fromNum)) {
      list = list.filter((p) => (p.discont_price ?? p.price) >= fromNum);
    }
    if (toNum != null && !Number.isNaN(toNum)) {
      list = list.filter((p) => (p.discont_price ?? p.price) <= toNum);
    }

    if (sort === "priceAsc") {
      list.sort(
        (a, b) => (a.discont_price ?? a.price) - (b.discont_price ?? b.price),
      );
    } else if (sort === "priceDesc") {
      list.sort(
        (a, b) => (b.discont_price ?? b.price) - (a.discont_price ?? a.price),
      );
    } else if (sort === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [products, from, to, sort]);

  return (
    <Box className={styles.container}>
      <Box className={styles.breadcrumbs}>
        <NavLink to="/" className={styles.crumb}>
          Main page
        </NavLink>
        <span className={styles.crumbActive}>All sales</span>
      </Box>
      <Typography
        sx={{
          fontSize: 64,
          fontWeight: 700,
          color: "#282828",
          mb: "24px",
        }}
      >
        Discounted items
      </Typography>

      <Box className={styles.filters}>
        <Box className={styles.priceBlock}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 500,
              color: "#282828",
            }}
          >
            Price
          </Typography>
          <TextField
            placeholder="from"
            size="small"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <TextField
            placeholder="to"
            size="small"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </Box>

        <Box className={styles.sortBlock}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 500,
              color: "#282828",
            }}
          >
            Sorted
          </Typography>
          <FormControl size="small">
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <MenuItem value="default">by default</MenuItem>
              <MenuItem value="priceAsc">price: low to high</MenuItem>
              <MenuItem value="priceDesc">price: high to low</MenuItem>
              <MenuItem value="title">title</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box className={styles.grid}>
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Box>
    </Box>
  );
}

export default DiscountedPage;
