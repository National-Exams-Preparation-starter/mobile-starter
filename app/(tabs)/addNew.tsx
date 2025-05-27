import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppLayout from "@/components/common/AppLayout";
import AppHeader from "@/components/common/AppHeader";
import ExpenseForm from "@/components/common/AddUpdateContainer";

const addNew = () => {
  return (
    <AppLayout>
      <View className="flex-row items-center justify-center py-5">
        <Text className="text-lg font-senSemiBold font-semibold text-primary">
          Add New Expense
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <ExpenseForm />
      </View>
    </AppLayout>
  );
};

export default addNew;
