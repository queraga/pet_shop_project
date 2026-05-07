import { useDispatch } from "react-redux";
import { decrementQty } from "../../../../entities/cart/model/cartSlice";

function DecrementQtyButton({ id, children, className }) {
  const dispatch = useDispatch();

  return (
    <button className={className} onClick={() => dispatch(decrementQty(id))}>
      {children}
    </button>
  );
}

export default DecrementQtyButton;
