// components/ExpenseForm.tsx
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FormInput from "./Input";
import { Button } from "./Button";
import { useToast } from "react-native-toast-notifications";
import { useCreateExpense, useUpdateExpense } from "@/hooks/useExpenses";
import useAuth from "@/context/auth/AuthProvider";

type ExpenseFormProps = {
  initialData?: any;
  onSuccess?: () => void;
};

const ExpenseForm = ({ initialData, onSuccess }: ExpenseFormProps) => {
  const { user } = useAuth();
  const userId = user?.id;
  const isEditing = Boolean(initialData);
  const [form, setForm] = useState({
    name: initialData?.name || "",
    amount: initialData?.amount?.toString() || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    date: initialData?.date || null,
  });

  const toast = useToast();
  const createExpenseMutation = useCreateExpense();
  const updateExpenseMutation = useUpdateExpense();

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      userId,
    };

    if (isEditing) {
      updateExpenseMutation.mutate(
        { id: initialData.id, data: payload },
        {
          onSuccess: () => {
            toast.show("Expense updated!", { type: "success" });
            onSuccess?.();
          },
          onError: (err: any) => {
            toast.show(err.message, { type: "danger" });
          },
        }
      );
    } else {
      createExpenseMutation.mutate(payload, {
        onSuccess: () => {
          toast.show("Expense created!", { type: "success" });
          onSuccess?.();
        },
        onError: (err: any) => {
          toast.show(err.message, { type: "danger" });
        },
      });
    }
  };

  return (
    <View className="flex flex-col gap-4">
      <FormInput
        label="Name"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
        placeholder="Expense name"
      />
      <FormInput
        label="Amount"
        value={form.amount}
        onChangeText={(text) => handleChange("amount", text)}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <FormInput
        label="Description"
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
        placeholder="Description"
      />
      <FormInput
        label="Category"
        value={form.category}
        onChangeText={(text) => handleChange("category", text)}
        placeholder="Category"
      />
      <FormInput
        label="Date"
        value={form.date}
        onChangeText={(text) => handleChange("date", text)}
        placeholder="YYYY-MM-DD"
      />
      <View className="py-3">
        <Button
          title={isEditing ? "Update Expense" : "Create Expense"}
          onPress={handleSubmit}
          isLoading={
            createExpenseMutation.isPending || updateExpenseMutation.isPending
          }
        />
      </View>
    </View>
  );
};

export default ExpenseForm;
