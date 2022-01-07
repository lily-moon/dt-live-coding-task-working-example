import { Box, Button, FormControl, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import { ALL_PRODUCTS, ShoppingCartItem } from "../models";

const AddItemBox = styled(Box)(() => ({
  display: "flex",
  flex: 1,
  marginTop: "25px"
}));

const ItemSelect = styled(FormControl)(() => ({
  width: "200px",
  marginRight: "20px"
}));

const QuantityInput = styled(FormControl)(() => ({
  width: "80px",
  marginRight: "20px"
}));

type AddItemProps = {
  addItem: (item: ShoppingCartItem) => void;
};

const AddItem: React.FC<AddItemProps> = ({ addItem }) => {
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const onItemSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(event.target.value);
  };

  const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = parseInt(event.target.value, 10);
    if (updatedValue < 0) return;
    setQuantity(parseInt(event.target.value, 10));
  };

  const onAddBtnClick = () => {
    if (productId && quantity) {
      addItem({ productId, quantity });
      setQuantity(0);
      setProductId("");
    }
  };

  return (
    <AddItemBox>
      <ItemSelect>
        <TextField select value={productId} label="Item" onChange={onItemSelect}>
          {ALL_PRODUCTS.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.label}
            </MenuItem>
          ))}
        </TextField>
      </ItemSelect>
      <QuantityInput>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={onQuantityChange}
        />
      </QuantityInput>
      <Button
        variant="contained"
        disabled={!quantity || !productId}
        onClick={onAddBtnClick}
      >
        Add
      </Button>
    </AddItemBox>
  );
};

export default AddItem;
