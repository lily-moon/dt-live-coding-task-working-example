export type Product = {
  id: string;
  price: number;
  label: string;
};

export type ShoppingCartItem = {
  productId: string;
  quantity: number;
};

export type ShoppingCartList = ShoppingCartItem[];

export const ALL_PRODUCTS: Product[] = [
  {
    id: "bread-product-id",
    price: 15,
    label: "Bread"
  },
  {
    id: "eggs-product-id",
    price: 20,
    label: "Eggs"
  },
  {
    id: "milk-product-id",
    price: 35,
    label: "Milk"
  },
  {
    id: "cheese-product-id",
    price: 45,
    label: "Cheese"
  }
];

export const PRODUCTS_MAP = ALL_PRODUCTS.reduce((acc: { [key: string]: Product }, product) => {
  acc[product.id] = product;
  return acc;
}, {});
