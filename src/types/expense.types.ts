export interface IBudget {
  id: string;
  isMatchPeriod: boolean | null;
  budgets: number;
}

export interface IBudgetPeriod {
  id?: string;
  title: string;
  dateFrom: string;
  dateTo: string;
  budgets: number;
}

export interface IExpenseToday {
  id?: string;
  title: string;
  tags: string;
  amount: number;
  reason?: string;
  date: string;
  userId: string;
}
