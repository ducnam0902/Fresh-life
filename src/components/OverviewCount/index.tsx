import { Paper, Slider, Stack, Typography } from "@mui/material";
import React from "react";
import theme from "../../utils/theme";

interface IOverviewCount {
  title: string;
  count?: number;
  icon: React.ReactNode;
  currency?: string;
  usedPercentage?: number;
  totalExpense?:string;
  remainExpense?:string
}
const OverviewCount = ({ title, count, icon, currency, usedPercentage, totalExpense, remainExpense }: IOverviewCount) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        pb: 3,
        borderRadius: 2,
        minHeight: "130px",
      }}
    >
      <Stack direction={"row"} width={"100%"} justifyContent={"space-between"}>
        <Typography
          variant="h6"
          sx={{
            fontSize: ".8rem",
            fontWeight: 500,
            color: theme.palette.primary.textMutedLight,
          }}
        >
          {title}
        </Typography>

        {icon}
      </Stack>
      <Typography variant="h4" sx={{ fontWeight: 600, marginTop: 1 }}>
          {currency ? `${totalExpense} ${currency}` : count}
      </Typography>
      {currency && (
        <>
          <Slider
            value={usedPercentage}
            aria-label="Budgets"
            valueLabelDisplay="auto"
            disabled
            sx={{
              "&.Mui-disabled": { color: theme.palette.primary.russianGreen },
              ".MuiSlider-thumb": { display: "none" },
              "&.MuiSlider-root": { height: "8px" },
            }}
            size="medium"
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.7rem",
              color: theme.palette.primary.textMutedLight,
            }}
          >
            You've {remainExpense} VND of your budget today
          </Typography>
        </>
      )}
    </Paper>
  );
};

export default OverviewCount;
