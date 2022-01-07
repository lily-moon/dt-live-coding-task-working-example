import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import { ShoppingCartItem, ShoppingCartList } from "../models";

import AddItem from "./AddItemForm";
import ItemsList from "./ItemsList";
import Total from "./Total";

const ShoppingCardWrapper = styled(Paper)(() => ({
  width: 600,
  margin: "auto",
  padding: 50,
  minHeight: 500
}));

const ShoppingCartHeader = styled(Typography)(() => ({
  textTransform: "uppercase",
  fontWeight: "bold",
  fontSize: 24
}));

const ShoppingCart = () => {
  const [itemsList, setItemsList] = useState<ShoppingCartList>([]);

  const addItem = ({ productId, quantity }: ShoppingCartItem) => {
    const itemExists = itemsList.some((item) => item.productId === productId);
    if (itemExists) {
      const updatedList = itemsList.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setItemsList(updatedList);
    } else {
      const updatedList = itemsList.concat({ productId, quantity });
      setItemsList(updatedList);
    }
  };

  const decreaseItem = (productId: string) => {
    const itemExists = itemsList.some((item) => item.productId === productId);
    if (itemExists) {
      const updatedList = itemsList.reduce((acc: ShoppingCartList, item) => {
        if (item.productId !== productId) {
          acc.push(item);

          return acc;
        } else {
          const updatedQuantity = item.quantity - 1;
          if (updatedQuantity) {
            acc.push({ ...item, quantity: updatedQuantity });

            return acc;
          } else {
            return acc;
          }
        }
      }, []);
      setItemsList(updatedList);
    }
  };

  const removeItem = (productId: string) => {
    const updatedList = itemsList.filter((item) => item.productId !== productId);
    setItemsList(updatedList);
  };

  const clearList = () => setItemsList([]);

  return (
    <ShoppingCardWrapper>
      <ShoppingCartHeader>Shopping Cart</ShoppingCartHeader>
      <AddItem addItem={addItem} />
      {!!itemsList.length && (
        <>
          <ItemsList
            itemsList={itemsList}
            addItem={addItem}
            decreaseItem={decreaseItem}
            removeItem={removeItem}
          />
          <Total clearList={clearList} itemsList={itemsList} />
        </>
      )}
    </ShoppingCardWrapper>
  );
};

export default ShoppingCart;
