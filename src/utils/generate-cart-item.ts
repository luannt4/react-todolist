import isEmpty from 'lodash/isEmpty';
interface Item {
  id: string | number;
  title: string;
  price: number;
  discountPercentage: number;
  category: string;
  thumbnail: string;
  stock?: number;
  availabilityStatus?: string;
  quantity?: number;
}
interface Variation {
  id: string | number;
  title: string;
  price: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item, variation: Variation) {
  const { id,title:name,  thumbnail, price,  quantity, category } = item;
  if (!isEmpty(variation)) {
    return {
      id: `${id}.${variation.id}`,
      productId: id,
      name: `${name} - ${variation.title}`,
      category,
      stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: thumbnail,
      variationId: variation.id,
    };
  }
  return {
    id,
    name,
    category,
    image: thumbnail,
    stock: quantity,
  };
}
