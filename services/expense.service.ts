import { apiClient } from "@/config/axios.config";

export const fetchExpensesByUserId = async (userId?: string) => {
  try {
    if (!userId) {
      return Promise.reject(new Error("User ID is required"));
    }
    const response = await apiClient.get(
      `/expenses?userId=${encodeURIComponent(userId)}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return [];
    }

    console.error("Error fetching expenses:", error);
    throw new Error("Failed to load expenses. Please try again later.");
  }
};

export const createExpense = async (data: {
  name: string;
  amount: number;
  description: string;
  userId?: string;
  category: string;
  date: string;
}) => {
  try {
    if (!data.userId) {
      return Promise.reject(new Error("User ID is required"));
    }
    const response = await apiClient.post("/expenses", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create expense");
  }
};

export const updateExpense = async (
  id: string,
  data: {
    name: string;
    amount: number;
    description: string;
    userId: string;
    category: string;
    date: string;
  }
) => {
  try {
    const response = await apiClient.put(`/expenses/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update expense");
  }
};

export const getExpenseById = async (id: string) => {
  try {
    const response = await apiClient.get(`/expenses/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to fetch expense");
  }
};

export const deleteExpense = async (id: string) => {
  try {
    const response = await apiClient.delete(`/expenses/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Delete expense error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to delete expense"
    );
  }
};
