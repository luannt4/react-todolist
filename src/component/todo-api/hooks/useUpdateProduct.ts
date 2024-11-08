// src/hooks/useUpdateProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../../../types/Todo";

const updateProduct = async (product: Product) => {
  const response = await fetch(`https://dummyjson.com/products/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: product.title,
      description: product.description,
      price: product.price,
    }),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json(); // Trả về sản phẩm đã cập nhật
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (updatedProduct) => {
      // Cập nhật lại danh sách sản phẩm sau khi cập nhật thành công
      queryClient.setQueryData(["products"], (oldProducts: any) =>
        oldProducts.map((product: any) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    },
  });
};