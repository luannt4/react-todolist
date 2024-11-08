// src/hooks/useAddProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../../../types/Todo";

const addProduct = async (product: Omit<Product, "id">) => {
  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Failed to add product");
  return response.json(); // Trả về sản phẩm đã thêm
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      // Cập nhật danh sách sản phẩm sau khi thêm thành công
      queryClient.setQueryData(["products"], (oldProducts: Product[] | undefined) =>
        oldProducts ? [...oldProducts, newProduct] : [newProduct]
      );
    },
  });
};