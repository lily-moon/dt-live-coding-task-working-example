import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { PRODUCTS_MAP, ShoppingCartList } from "../models";

const TotalWrapper = styled(Box)(() => ({
  paddingTop: 40
}));

type TotalProps = {
  clearList: () => void;
  itemsList: ShoppingCartList;
};

const Total: React.FC<TotalProps> = ({ clearList, itemsList }) => {
  const totalValue = itemsList.reduce((acc, item) => {
    const price = PRODUCTS_MAP[item.productId]?.price || 0;
    acc += item.quantity * price;

    return acc;
  }, 0);

  return (
    <TotalWrapper>
      <Grid container>
        <Grid item xs={6}>
          <Typography>{`Total: $${totalValue}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" onClick={clearList}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </TotalWrapper>
  );
};

export default Total;
