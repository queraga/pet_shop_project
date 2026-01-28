import { Box, Typography, Button, Dialog, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
  placeOrder,
  resetOrderPlaced,
  clearCart,
} from "../../features/cart/cartSlice";
import styles from "../cartPage/styles.module.css";
import minus from "../../assets/icons/minus.svg";
import plus from "../../assets/icons/plus.svg";
import closeIcon from "../../assets/icons/closeIcon.svg";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import whiteCloseBtn from "../../assets/icons/whiteCloseBtn.svg";

function CartPage() {
  const dispatch = useDispatch();

  const orderPlaced = useSelector((state) => state.cart.orderPlaced);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", phone: "", email: "" },
  });

  const onSubmit = () => {
    dispatch(placeOrder());
    reset();
  };

  const handleClose = () => {
    dispatch(clearCart());
    dispatch(resetOrderPlaced());
  };

  const items = useSelector((state) => state.cart.items);

  const itemsCount = items.reduce((sum, x) => sum + x.qty, 0);
  const total = items.reduce((sum, x) => {
    const price = x.discont_price ?? x.price;
    return sum + price * x.qty;
  }, 0);

  if (items.length === 0) {
    return (
      <Box className={styles.container}>
        <Box className={styles.headerRow}>
          <Typography
            sx={{
              fontSize: 64,
              fontWeight: 700,
              color: "#282828",
            }}
          >
            Shopping cart
          </Typography>
          <Box className={styles.headerLine} />
          <Button
            component={NavLink}
            to="/products"
            variant="outlined"
            sx={{
              height: 36,
              borderRadius: "6px",
              textTransform: "none",
              borderColor: "#DDDDDD",
              color: "#8b8b8b",
              "&:hover": {
                borderColor: "#8b8b8b",
                backgroundColor: "transparent",
              },
            }}
          >
            Back to the store
          </Button>
        </Box>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 500,
            mb: "32px",
          }}
        >
          Looks like you have no items in your basket currently
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontSize: 20,
            textTransform: "none",
            backgroundColor: "#0D50FF",
            padding: "12px 56px",
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.headerRow}>
        <Typography
          sx={{
            fontSize: 64,
            fontWeight: 700,
            color: "#282828",
          }}
        >
          Shopping cart
        </Typography>
        <Box className={styles.headerLine} />
        <Button
          component={NavLink}
          to="/products"
          variant="outlined"
          sx={{
            height: 36,
            borderRadius: "6px",
            textTransform: "none",
            borderColor: "#DDDDDD",
            color: "#8b8b8b",
            "&:hover": {
              borderColor: "#8b8b8b",
              backgroundColor: "transparent",
            },
          }}
        >
          Back to the store
        </Button>
      </Box>

      <Box className={styles.layout}>
        {/* left side */}

        <Box className={styles.left}>
          {items.map((item) => {
            const price = item.discont_price ?? item.price;

            return (
              <Box key={item.id} className={styles.row}>
                <img
                  src={`http://localhost:3333${item.image}`}
                  alt={item.title}
                  className={styles.rowImg}
                />
                <Box className={styles.rowInfo}>
                  <Box className={styles.rowTop}>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "#282828",
                        fontWeight: 500,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Button
                      className={styles.removeBtn}
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <img src={closeIcon} alt="Close" />
                    </Button>
                  </Box>
                  <Box className={styles.rowBottom}>
                    <Box className={styles.controls}>
                      <Box className={styles.qty}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => dispatch(decrementQty(item.id))}
                        >
                          <img src={minus} alt="decrease" />
                        </button>
                        <span className={styles.qtyValue}>{item.qty}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => dispatch(incrementQty(item.id))}
                        >
                          <img src={plus} alt="increase" />
                        </button>
                      </Box>

                      <Box className={styles.prices}>
                        <span className={styles.price}>
                          ${price * item.qty}
                        </span>
                        {item.discont_price && (
                          <span className={styles.oldPrice}>
                            ${item.price * item.qty}
                          </span>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* right side */}

        <Box className={styles.right}>
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: 700,
              color: "#282828",
              mb: "24px",
            }}
          >
            Order details
          </Typography>
          <Typography
            sx={{
              fontSize: 40,
              color: "#8B8B8B",
              fontWeight: 500,
            }}
          >
            {itemsCount} items
          </Typography>

          <Box className={styles.totalRow}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalValue}>${total.toFixed(2)}</span>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <TextField
              placeholder="Name"
              fullWidth
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                input: {
                  backgroundColor: "white",
                  fontSize: "20px",
                  fontWeight: 500,
                  padding: "16px 32px 16px 32px",
                },
              }}
            />

            <TextField
              placeholder="Phone number"
              fullWidth
              {...register("phone", { required: "Phone is required" })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={{
                input: {
                  backgroundColor: "white",
                  fontSize: "20px",
                  fontWeight: 500,
                  padding: "16px 32px 16px 32px",
                },
              }}
            />

            <TextField
              placeholder="Email"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                input: {
                  backgroundColor: "white",
                  fontSize: "20px",
                  fontWeight: 500,
                  padding: "16px 32px 16px 32px",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={orderPlaced}
              sx={{
                textTransform: "none",
                width: "100%",
                height: "58px",
                fontSize: 20,
                backgroundColor: "#0D50FF",
                mt: "32px",
                "&:hover": { backgroundColor: "#0B46E0" },
                "&.Mui-disabled": {
                  backgroundColor: "#fff",
                  color: "#282828",
                  border: "1px solid #282828",
                },
              }}
            >
              {orderPlaced ? "The Order is Placed" : "Order"}
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={orderPlaced}
        onClose={handleClose}
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              width: 548,
              borderRadius: "12px",
              padding: "32px",
              backgroundColor: "#0D50FF",
              color: "#fff",
            },
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          disableRipple
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
          }}
        >
          <img src={whiteCloseBtn} alt="Close" />
        </IconButton>
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: 600,
            mb: 2,
          }}
        >
          Congratulations!
        </Typography>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          Your order has been successfully placed on the website.
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 500, mt: 2 }}>
          A manager will contact you shortly to confirm your order.
        </Typography>
      </Dialog>
    </Box>
  );
}

export default CartPage;
