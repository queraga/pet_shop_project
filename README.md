# Pet Shop (React + RTK + FSD)

Pet Shop is a small e-commerce frontend project built with React.  
It includes product catalog pages, filters, product details, shopping cart flow and an order confirmation modal.

## Tech Stack

- React (Vite)
- React Router DOM
- Redux Toolkit
- Material UI (MUI)
- Axios
- React Hook Form
- LocalStorage (cart persistence)

## Features

- Home page (Hero, Categories preview, Discount form, Sale preview)
- Categories page
- Products by category page (filters + sort)
- All products page (filters + sort + discounted checkbox)
- Discounted items page (filters + sort)
- Product page (qty counter, add to cart)
- Cart page:
  - Empty state
  - Cart items with qty controls (+/-), remove item
  - Order form validation (React Hook Form)
  - Order confirmation modal
- 404 Not Found page

## Project Structure (FSD, src)

- `app/`
  - `providers/` - app-level providers (store, theme)

- `entities/`
  - `cart/` - cart model (slice, selectors)

  - `product/` - product UI (ProductCard)

  - `category/` - category UI (CategoryCard)

- `features/`
  - `cart/` - user actions (add to cart, increment/decrement qty, remove item)

- `widgets/`
  - `header/`, `footer/`, `mainLayout/` - layout blocks

- `pages/` - app pages (home, products, cart, etc.)

- `shared/`
  - `api/` - axios client + endpoints

  - `assets/` - icons and images

  - `utils/` - helpers

## Setup

### 1) Install dependencies

```bash

npm install
```

## Run client

```
npm run dev
```

## Run server (API)

```
cd server

npm install

npm run dev
```

### Server runs on: http://localhost:3333

### Client runs on: http://localhost:5173

## Notes

    •	Cart is stored in localStorage (persists after refresh).
    •	Order action is simulated locally (no real order submission required).

```

```

```

```
