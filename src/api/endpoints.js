import api from "./client";

export const getCategories = () => api.get("/categories/all");
export const getProducts = () => api.get("/products");
export const getSaleProducts = () => api.get("/sale");
