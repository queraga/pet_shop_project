import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { getCategories, getProducts } from "../../api/endpoints";
import ProductCard from "../../components/product/productCard/index";
import styles from "../categoryPage/styles.module.css";

function CategoryPage() {
  const { categoryId } = useParams();
  const [categoryTitle, setCategoryTitle] = useState("");
  const [products, setProducts] = useState([]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    getCategories()
      .then((res) => {
        const cat = res.data.find((c) => String(c.id) === String(categoryId));
        setCategoryTitle(cat?.title ?? "Category");
      })
      .catch((err) => console.log("categories error:", err));
  }, [categoryId]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const byCat = res.data.filter(
          (p) => String(p.categoryId) === String(categoryId),
        );
        setProducts(byCat);
      })
      .catch((err) => console.log("products error:", err));
  }, [categoryId]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (discountOnly) {
      list = list.filter((p) => p.discont_price != null);
    }

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
  }, [products, discountOnly, from, to, sort]);

  return (
    <Box className={styles.container}>
      <Box className={styles.breadcrumbs}>
        <NavLink to="/" className={styles.crumb}>
          Main page
        </NavLink>
        <NavLink to="/categories" className={styles.crumb}>
          Categories
        </NavLink>
        <span className={styles.crumbActive}>
          <strong>{categoryTitle}</strong>
        </span>
      </Box>
      <Typography
        sx={{
          fontSize: 64,
          fontWeight: 700,
          color: "##282828",
          mb: "20px",
        }}
      >
        {categoryTitle}
      </Typography>

      <Box className={styles.filters}>
        <Box className={styles.priceBlock}>
          <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#282828" }}>
            Price
          </Typography>
          <TextField
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="from"
            size="small"
          />
          <TextField
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="to"
            size="small"
          />
        </Box>
        <FormControlLabel
          label="Discounted items"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: 20,
              fontWeight: 500,
              color: "#282828",
            },
          }}
          control={
            <Checkbox
              checked={discountOnly}
              onChange={(e) => setDiscountOnly(e.target.checked)}
            />
          }
        />
        <Box className={styles.sortBlock}>
          <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#282828" }}>
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

export default CategoryPage;
