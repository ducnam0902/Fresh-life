import { Box, Stack, Typography } from "@mui/material";
import type { IExpenseToday } from "../../types/expense.types";
import theme from "../../utils/theme";
import { MdRestaurant } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { MdOutlineDriveEta } from "react-icons/md";
import { MdOutlineLocalBar } from "react-icons/md";
interface IExpenseList {
  expense: IExpenseToday;
}

const getFavouriteIcon = (tag: string) => {
  switch (tag) {
    case "Eating":
      return <MdRestaurant size={24} color={theme.palette.primary.russianGreen} />;
    case "Shopping":
      return <MdShoppingCart size={24} color={theme.palette.primary.russianGreen} />;
    case "Transport":
      return <MdOutlineDriveEta size={24} color={theme.palette.primary.russianGreen} />;
    case "Drinking":
      return <MdOutlineLocalBar size={24} color={theme.palette.primary.russianGreen} />;
    default:
      return null;
  }
}

const ExpenseList = ({ expense }: IExpenseList) => {
  
  return (
    <>
      <Box
        sx={{
          width: "auto",
          border: `1px solid ${theme.palette.primary.borderGray200}`,
        }}
      />
      <Stack
        direction="row"
        spacing={2}
        justifyContent={"space-between"}
        alignItems="center"
        sx={{ p: 3}}
      >
        <Stack direction="row" spacing={4} alignItems="center">
          <Box sx={{backgroundColor: theme.palette.primary.lightGreen, width: '50px', height: '50px', borderRadius: 3, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {getFavouriteIcon(expense.tags)}
          </Box>
          <Box>
            <Typography variant="body1" letterSpacing={'1px'}>{expense.title}</Typography>
            <Typography variant="body1" sx={{color: theme.palette.primary.main}}>{expense.tags}</Typography>
          </Box>
        </Stack>
        <Box>
          <Typography>{expense.amount?.toLocaleString('vi-VN')} VND</Typography>
        </Box>
      </Stack>
    </>
  );
};

export default ExpenseList;
