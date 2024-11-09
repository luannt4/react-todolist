import React, { useState, useEffect } from "react";
import { useProductContext  } from "./context/ProductContext";
import { useUpdateProduct } from "./hooks/useUpdateProduct";
import { useAddProduct } from "./hooks/useAddProduct";


export const ProductForm: React.FC = () => {
    const { state, dispatch } = useProductContext();
    const addProductMutation = useAddProduct();
    const updateProductMutation = useUpdateProduct();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    
   useEffect(() => {
    if (state.editingProduct) {
      setTitle(state.editingProduct.title);
      setDescription(state.editingProduct.description);
      setPrice(state.editingProduct.price);
    }
  }, [state.editingProduct]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
         const newProduct = {
            id: state.editingProduct ? state.editingProduct.id : Date.now(),
            title,
            description,
            price: typeof price === "number" ? price : 0,
        };

        if (state.editingProduct) {
            updateProductMutation.mutate(newProduct, {
                onSuccess: () => {
                dispatch({ type: "UPDATE_PRODUCT", payload: newProduct });
                },
            });
      
        } else {
            addProductMutation.mutate(newProduct, {
                onSuccess: (addedProduct) => {
                dispatch({ type: "ADD_PRODUCT", payload: addedProduct });
                },
            });
        }

        setTitle("");
        setDescription("");
        setPrice("");
   };

    
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
            <label className="block mb-1">Title:</label>
            <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Title"
                value={title}
                 onChange={(e) => setTitle(e.target.value)}
            />

             <label className="block mb-1">Description:</label>
            <input
                type="text"
                placeholder="Description"
                className="border p-2"
                 value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label className="block mb-1">Price:</label>
            <input
                type="number"
                placeholder="Price"
                className="border p-2"
                 value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
               
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {state.editingProduct  ? "Update" : "Add"}
            </button>
        </form>
    );
}

  export default ProductForm;