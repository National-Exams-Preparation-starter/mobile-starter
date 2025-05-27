import useAuth from "@/context/auth/AuthProvider";
import { useExpenses } from "@/hooks/useExpenses";
import React, { FC, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ExpenseCard from "./ExpenseCard";
import FormInput from "./Input";
import { useRouter } from "expo-router";

interface HomeContainerProps {
  limit?: number;
}

const HomeContainer: FC<HomeContainerProps> = ({ limit }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const userId = user?.id;
  
  const router = useRouter();
  const { data: expenses, isLoading, error, refetch } = useExpenses(userId);

  // Filtered expenses based on category match
  const filteredExpenses = expenses?.filter((expense: any) =>
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const limitedExpenses = limit
    ? filteredExpenses?.slice(0, limit)
    : filteredExpenses;

  return (
    <View>
      {limit && (
        <>
          <View className="flex-row items-center gap-1">
            <Text className="text-base font-normal font-senRegular text-[#1E1D1D]">
              Hey {user?.lastname || "User"},
            </Text>
            <Text className="text-base font-normal font-senBold">
              Good Afternoon!
            </Text>
          </View>
            </>
          )}
          {/* search bar */}
          <View className={`py-4 ${!limit && "mt-4"}`}>
            <FormInput
              placeholder="Search for your desired category"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
      {/* view all scrollView */}
      <View>
        <View className="flex-row items-center justify-between py-2">
          <Text className="text-base font-senBold">Expenses</Text>
          {limit && (
            <TouchableOpacity onPress={()=>router.push("/(tabs)/home/expenses")}>
            <Text className="text-base font-senRegular text-[#FF7622]">
              See All
            </Text>
            </TouchableOpacity>
          )}
        </View>
        {/* main scrollview */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#FF7622" className="mt-5" />
        ) : error && !expenses ? (
          <View>
            <Text className="text-center text-gray-400 mt-5">
              No expenses found.
            </Text>
            <TouchableOpacity onPress={() => refetch()}>
              <Text className="text-center text-primary mt-2">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={limitedExpenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExpenseCard {...item} />}
            ListEmptyComponent={
              <Text className="text-center text-gray-400 mt-5">
                No expenses found.
              </Text>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            onRefresh={refetch}
          />
        )}
      </View>
    </View>
  );
};

export default HomeContainer;
