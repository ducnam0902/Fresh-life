import React from "react";
import Title from "../../components/Title";
import { Button } from "@mui/material";

const Expenses: React.FC = () => {
  return (
    <div>
      <Title
        title="Expense Management"
        subTitle="Track your daily expenses and manage your budget"
      >
        <Button variant="contained" color="primary">
          Add Expense
        </Button>
      </Title>
    </div>
  );
};

export default Expenses;
