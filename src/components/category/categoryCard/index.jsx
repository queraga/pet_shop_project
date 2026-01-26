import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "../categoryCard/styles.module.css";

function CategoryCard({ id, title, image }) {
  return (
    <Box component={NavLink} to={`/categories/${id}`} className={styles.card}>
      <img
        src={`http://localhost:3333${image}`}
        alt={title}
        className={styles.img}
      />

      <Typography
        sx={{
          mt: 2,
          fontSize: 20,
          color: "#282828",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default CategoryCard;
