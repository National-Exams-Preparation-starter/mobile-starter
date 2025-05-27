import {
  createExpense,
  deleteExpense,
  fetchExpensesByUserId,
  updateExpense,
} from "@/services/expense.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useExpenses = (userId?: string) => {
  return useQuery({
    queryKey: ["expenses", userId],
    queryFn: () => fetchExpensesByUserId(userId),
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: (_, id) => {
      // Remove the deleted expense from the cache
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.removeQueries({ queryKey: ["expense", id] });
    },
  });
};
