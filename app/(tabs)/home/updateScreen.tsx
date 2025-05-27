import ExpenseForm from "@/components/common/AddUpdateContainer";
import AppLayout from "@/components/common/AppLayout";
import { getExpenseById } from "@/services/expense.service";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const updateScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const {
    data: expense,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expense", id],
    queryFn: () => getExpenseById(id),
    enabled: !!id,
  });

  // 1. Loading skeleton
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FF7622" />
        <Text className="mt-4 text-[#FF7622] font-senBold">Loading...</Text>
      </View>
    );
  }

  // 2. Error or Not Found screen
  if (error || !expense) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-2xl font-senBold text-red-600">Not Found</Text>
        <Text className="text-base text-center text-gray-500 mt-2 mb-6">
          We couldn’t find the expense you were looking for.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/home/homeScreen")}
          className="px-6 py-3 bg-[#FF7622] rounded-lg"
        >
          <Text className="text-white text-base font-senBold">Return Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <AppLayout>
      <View className="flex-row items-center justify-between relative">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full bg-primary"
        >
          <ChevronLeft size={22} color={"#fff"} />
        </TouchableOpacity>

        <Text className="text-lg font-senSemiBold font-semibold text-primary -ml-5">
          Update your Expense
        </Text>
        <View />
      </View>
      <View style={{ flex: 1 }}>
        <ExpenseForm initialData={expense} />
      </View>
    </AppLayout>
  );
};

export default updateScreen;
