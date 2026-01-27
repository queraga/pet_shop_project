import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

import HomePage from "./pages/homePage";
import CategoriesPage from "./pages/categoriesPage";
import CategoryPage from "./pages/categoryPage";
import AllProductsPage from "./pages/allProductsPage";
import DiscountedPage from "./pages/discountedPage";
import ProductPage from "./pages/productPage";
import CartPage from "./pages/cartPage";
import NotFoundPage from "./pages/notFoundPage";
import MainLayout from "./components/layout/mainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categoryId" element={<CategoryPage />} />

          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/sales" element={<DiscountedPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
        </Route>

        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
