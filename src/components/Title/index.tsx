import { Box, Typography } from "@mui/material";
import React from "react";
import theme from "../../utils/theme";

interface ITitle {
  title: string;
  subTitle: string;
  children?: React.ReactNode;
}

const Title = ({ title, subTitle, children }: ITitle) => {
  return (
    <Box
      mb={4}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      textAlign={"center"}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "1.2rem",
              sm: "1.5rem",
              lg: "1.6rem",
            },
            fontWeight: 600,
            color: theme.palette.primary.textLight,
            lineHeight: "1.235",
            marginBottom: 1,
            textAlign: "left",
            letterSpacing: "0.00735rem",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 400,
            fontSize: {
              xs: "0.8rem",
              md: "1rem",
              lg: "1.2rem",
            },
            textAlign: "left",
            lineHeight: "1.5",
            color: theme.palette.primary.textMutedLight,
          }}
        >
          {subTitle}
        </Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Title;
