import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/homePage";
import MainLayout from "../../widgets/mainLayout";
import CategoriesPage from "../../pages/categoriesPage";
import CategoryPage from "../../pages/categoryPage";
import AllProductsPage from "../../pages/allProductsPage";
import DiscountedPage from "../../pages/discountedPage";
import ProductPage from "../../pages/productPage";
import CartPage from "../../pages/cartPage";
import NotFoundPage from "../../pages/notFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />

        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/sales" element={<DiscountedPage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
