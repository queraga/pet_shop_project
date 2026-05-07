import api from "./client";

export const getCategories = () => api.get("/categories/all");
export const getProducts = () => api.get("/products/all");
export const getSaleProducts = () => api.get("/sale/all");
export const getProductById = (id) => api.get(`/products/${id}`);
