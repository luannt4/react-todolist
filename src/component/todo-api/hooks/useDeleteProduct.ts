// src/hooks/useDeleteProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteProduct = async (productId: number) => {
  const response = await fetch(`https://dummyjson.com/products/${productId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return productId; // Trả về ID của sản phẩm đã xóa
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (deletedProductId) => {
      // Cập nhật danh sách sản phẩm sau khi xóa thành công
      queryClient.setQueryData(["products"], (oldProducts: any) =>
        oldProducts.filter((product: any) => product.id !== deletedProductId)
      );
    },
  });
};