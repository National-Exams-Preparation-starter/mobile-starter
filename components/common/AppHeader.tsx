import { useRouter } from "expo-router";
import { UserCircle2 } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AppHeader = () => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between py-5">
      <View className="gap-1">
        <Text className="text-primary font-senExtraBold font-extrabold uppercase">
          Expense Tracker
        </Text>
        <Text className="text-[#676767] font-senRegular">
          manage your expenses
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
        <UserCircle2 size={30} color="#676767" />
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;
