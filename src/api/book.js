import { axiosClient } from "./axios";

export const getCategories = () => axiosClient.get("/api/categories");

export const getBooks = (pagingState) =>
  axiosClient.get(
    `/api/books?page=${pagingState.currentPage}&limit=${pagingState.pageSize}`
  );

export const getBookById = (id) => axiosClient.get(`/api/books/${id}`);
