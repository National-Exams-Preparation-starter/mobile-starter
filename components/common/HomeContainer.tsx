import { useExpenses } from "@/hooks/useExpenses";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "./Card";
import FormInput from "./Input";
import { FlatList } from "react-native-gesture-handler";
import ExpenseCard from "./ExpenseCard";
import useAuth from "@/context/auth/AuthProvider";
import { Button } from "./Button";

const HomeContainer = () => {
  const { width } = Dimensions.get("screen");
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const userId = user?.id;
  const {
    data: expenses,
    isLoading,
    error,
    refetch
  } = useExpenses(userId);

  return (
    <View>
      <View className="flex-row items-center gap-1">
        <Text className="text-base font-normal font-senRegular text-[#1E1D1D]">
          Hey {user?.lastname || "User"},
        </Text>
        <Text className="text-base font-normal font-senBold">
          Good Afternoon!
        </Text>
      </View>
      {/* search bar */}
      <View className="py-4">
        <FormInput
          placeholder="Search for your desired"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      {/* view all scrollView */}
      <View>
        <View className="flex-row items-center justify-between py-2">
          <Text className="text-base font-senBold">Products</Text>
          <Text className="text-base font-senRegular text-[#FF7622]">
            See All
          </Text>
        </View>
        {/* main scrollview */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#FF7622" className="mt-5" />
        ) : error ? (
          <View>

          <Text className="text-center text-red-500 mt-5">
            {(error as Error).message}
          </Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text className="text-center text-primary mt-2" >
              Retry
            </Text>
          </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={expenses}
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
