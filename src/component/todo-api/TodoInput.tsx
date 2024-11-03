import React, { useState, useEffect } from "react";
import { Product } from "../../type/Todo";
import { useProductContext  } from "./context/ProductContext";
import { useUpdateProduct, useAddProduct } from './api';


export const ProductForm: React.FC = () => {
    const { state } = useProductContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    
    const updateProduct = useUpdateProduct();
    const addProduct = useAddProduct();

   
   useEffect(() => {
    if (state.editingProduct) {
      setTitle(state.editingProduct.title);
      setDescription(state.editingProduct.description);
      setPrice(state.editingProduct.price);
    }
  }, [state.editingProduct]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (state.editingProduct) {
        await updateProduct.mutateAsync({
            id: state.editingProduct ? state.editingProduct.id : Date.now(),
            title: state.editingProduct.title,
            description: state.editingProduct.description,
            price: state.editingProduct.price,
        });
        } else {
            await addProduct.mutateAsync({
            title,
            description,
            price: typeof price === "number" ? price : 0,
        });
        }

        setTitle("");
        setDescription("");
        setPrice("");
   };

     const handleChange = (    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        /*setFormData((prev) => ({
        ...prev,
        [name]: name === 'price' ? Number(value) : value,
        }));*/
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