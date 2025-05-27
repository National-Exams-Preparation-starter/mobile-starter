// components/ExpenseForm.tsx
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FormInput from "./Input";
import { Button } from "./Button";
import { useToast } from "react-native-toast-notifications";
import { useCreateExpense, useUpdateExpense } from "@/hooks/useExpenses";
import useAuth from "@/context/auth/AuthProvider";
import useValidate from "@/hooks/useValidate";
import { expenseSchema } from "@/constants/validationSchemas";
import { useRouter } from "expo-router";

type ExpenseFormProps = {
  initialData?: any;
  onSuccess?: () => void;
};

const ExpenseForm = ({ initialData, onSuccess }: ExpenseFormProps) => {
  const { user } = useAuth();
  const userId = user?.id;
  const router = useRouter();
  const isEditing = Boolean(initialData);
  const { validate } = useValidate();

  const [form, setForm] = useState({
    name: initialData?.name || "",
    amount: initialData?.amount?.toString() || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    date: initialData?.date || null,
  });

  // error validation
  const [error, setError] = useState({
    name: "",
    amount: "",
    description: "",
    category: "",
    date: "",
  });

  const validateField = (name: string, value: string) => {
    const fieldSchema = { [name]: expenseSchema[name] };
    const fieldData = { [name]: value };
    const { errors } = validate(fieldData, fieldSchema);
    setError((prev) => ({
      ...prev,
      [name]: errors[name] || "",
    }));
  };

  const toast = useToast();
  const createExpenseMutation = useCreateExpense();
  const updateExpenseMutation = useUpdateExpense();

  const handleInputChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = () => {
    const { isValid, errors } = validate(form, expenseSchema);
    setError({
      name: errors.name || "",
      amount: errors.amount || "",
      description: errors.description || "",
      category: errors.category || "",
      date: errors.date || "",
    });

    if (isValid) {
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
            router.push("/(tabs)/home/homeScreen");
          },
          onError: (err: any) => {
            toast.show(err.message, { type: "danger" });
          },
        });
      }
    }
  };

  return (
    <View className="flex flex-col gap-4">
      <FormInput
        label="Name"
        value={form.name}
        onChangeText={(text) => handleInputChange("name", text)}
        placeholder="Expense name"
        errorMessage={error.name}
      />
      <FormInput
        label="Amount"
        value={form.amount}
        onChangeText={(text) => handleInputChange("amount", text)}
        placeholder="Amount"
        keyboardType="numeric"
        errorMessage={error.amount}
      />
      <FormInput
        label="Description"
        value={form.description}
        onChangeText={(text) => handleInputChange("description", text)}
        placeholder="Description"
        errorMessage={error.description}
      />
      <FormInput
        label="Category"
        value={form.category}
        onChangeText={(text) => handleInputChange("category", text)}
        placeholder="Category"
        errorMessage={error.category}
      />
      <FormInput
        label="Date"
        value={form.date}
        onChangeText={(text) => handleInputChange("date", text)}
        placeholder="YYYY-MM-DD"
        errorMessage={error.date}
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
