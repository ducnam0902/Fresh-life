import React, { useState } from "react";
import Title from "../../components/Title";
import { Button } from "@mui/material";
import CreateExpenseModal, { type ExpenseFormData } from "../../components/CreateExpenseModal";

const Expenses: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleAddExpense = async (data: ExpenseFormData) => {
    console.log("New Expense Data:", data);
  }

  return (
    <div>
      <Title
        title="Expense Management"
        subTitle="Track your daily expenses and manage your budget"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Add Expense
        </Button>
      </Title>
      <CreateExpenseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddExpense}
      />
    </div>
  );
};

export default Expenses;
