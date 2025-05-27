import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Button } from "./Button";
import { useToast } from "react-native-toast-notifications";
import { useDeleteExpense } from "@/hooks/useExpenses";

type SingleItemContainerProps = {
  expense: {
    name: string;
    amount: number;
    description: string;
    category: string;
    date: string;
    id: string;
  };
};

const SingleItemContainer = ({ expense }: SingleItemContainerProps) => {
  const { height: h } = Dimensions.get("screen");
  const router = useRouter();

  const toast = useToast();
  const deleteMutation = useDeleteExpense();

  const handleDelete = () => {
    deleteMutation.mutate(expense.id, {
      onSuccess: () => {
        toast.show("Expense deleted successfully", { type: "success" });
        router.push("/(tabs)/home/homeScreen");
      },
      onError: (error: any) => {
        toast.show(error.message || "Failed to delete expense", {
          type: "danger",
        });
      },
    });
  };
  return (
    <View className="flex-1 bg-white">
      {/* Top header */}
      <View
        style={{ height: h * 0.3 }}
        className="bg-[#FF7622] rounded-b-[30px] px-6 pt-16"
      >
        <View className="flex items-center justify-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-0 left-0 z-10 p-2 rounded-full bg-white"
          >
            <ChevronLeft size={22} color={"#000"} />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-senBold">
            Expense Details
          </Text>
        </View>
        <View className="mt-10">
          <Text className="text-white text-2xl font-senBold">
            {expense.category}
          </Text>
          <Text className="text-white text-sm mt-1 font-senRegular">
            {new Date(expense.date).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Expense details */}
      <View className="-mt-12 px-6">
        <View className="bg-gray-50 px-5 py-6 rounded-2xl shadow shadow-black/10">
          <Text className="text-xl font-senBold mb-1">{expense.name}</Text>
          <Text className="text-base text-gray-600 font-senRegular mb-3">
            {expense.description}
          </Text>
          <Text className="text-lg font-bold text-[#FF7622]">
            {expense.amount} FRW
          </Text>
        </View>

        {/* Action buttons */}
        <View className="flex-row items-center gap-4 mt-6">
          <Button
            title="Delete"
            className="border border-primary bg-white flex-1"
            textStyle="!text-primary"
            onPress={() => handleDelete()}
            isLoading={deleteMutation.isPending}
          />
          <Button
            title="Update"
            className="flex-1"
            onPress={() => {
              router.push({
                pathname: "/(tabs)/home/updateScreen",
                params: { id: expense.id },
              });
            }}
          />
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default SingleItemContainer;
