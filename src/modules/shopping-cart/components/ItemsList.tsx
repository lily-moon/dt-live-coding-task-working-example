import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { PRODUCTS_MAP, ShoppingCartItem, ShoppingCartList } from "../models";

const ItemsListWrapper = styled(Box)(() => ({
  paddingTop: 20
}));

type ItemsListProps = {
  itemsList: ShoppingCartList;
  addItem: (item: ShoppingCartItem) => void;
  decreaseItem: (productId: string) => void;
  removeItem: (productId: string) => void;
};

const ItemsList: React.FC<ItemsListProps> = ({
  itemsList,
  addItem,
  decreaseItem,
  removeItem
}) => {
  return (
    <ItemsListWrapper>
      {itemsList.map((item) => {
        const product = PRODUCTS_MAP[item.productId];
        const price = product?.price || 0;

        return (
          <Grid container key={item.productId}>
            <Grid item xs={12}>
              <Typography>{product?.label}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`${item.quantity} x $${price} = $${
                item.quantity * price
              }`}</Typography>
            </Grid>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button
                onClick={() => addItem({ productId: item.productId, quantity: 1 })}
              >
                +
              </Button>
              <Button onClick={() => decreaseItem(item.productId)}>-</Button>
              <Button onClick={() => removeItem(item.productId)}>x</Button>
            </ButtonGroup>
          </Grid>
        );
      })}
    </ItemsListWrapper>
  );
};

export default ItemsList;
