import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../../entities/cart/model/cartSlice";

function RemoveFromCartButton({ id, children, className, sx }) {
  const dispatch = useDispatch();

  return (
    <Button
      className={className}
      sx={sx}
      onClick={() => dispatch(removeFromCart(id))}
    >
      {children}
    </Button>
  );
}

export default RemoveFromCartButton;
