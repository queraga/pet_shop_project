import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../entities/cart/model/cartSlice";

function AddToCartButton({ product, added, onAdded }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    onAdded?.();
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
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
  );
}

export default AddToCartButton;
