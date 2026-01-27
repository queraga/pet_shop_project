import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getCategories } from "../../api/endpoints";
import CategoryCard from "../../components/category/categoryCard/index";
import styles from "../categoriesPage/styles.module.css";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("categories error:", err));
  }, []);

  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <Box className={styles.breadcrumbs}>
          <span className={styles.crumb}>Main Page</span>
          <span className={styles.crumbActive}>Categories</span>
        </Box>
        <Typography
          sx={{
            fontSize: "64px",
            color: "#282828",
            fontWeight: 700,
            mb: "40px",
          }}
        >
          Categories
        </Typography>
        <Box className={styles.grid}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              title={cat.title}
              image={cat.image}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default CategoriesPage;
