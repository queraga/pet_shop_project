import { useDispatch } from "react-redux";
import { incrementQty } from "../../../../entities/cart/model/cartSlice";

function IncrementQtyButton({ id, children, className }) {
  const dispatch = useDispatch();

  return (
    <button className={className} onClick={() => dispatch(incrementQty(id))}>
      {children}
    </button>
  );
}

export default IncrementQtyButton;
