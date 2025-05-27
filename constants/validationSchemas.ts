import { ValidationRules } from "@/hooks/useValidate";

export const expenseSchema: ValidationRules = {
    name: {
      type: "string" as const,
      required: true,
      minLength: 3,
      message: "Firstname must be at least 3 characters",
    },
    amount: {
      type: "number" as const,
      required: true,
      message: "amount must be a number",
    },
    description: {
      type: "string" as const,
      required: true,
      minLength: 6,
      maxLength:30,
      message: "description must be at least 6 characters",
    },
    category: {
      type: "string" as const,
      required: true,
      minLength: 3,
      message: "category must be at least 3 characters",
    },
    date: {
      type: "date" as const,
      required: true,
      minLength: 6,
      message: "date must be a valid date",
    },
  };
