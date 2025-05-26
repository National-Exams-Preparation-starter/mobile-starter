import { Text, View } from "react-native";
import React from "react";
import { UserCircle2 } from "lucide-react-native";

const AppHeader = () => {
  return (
    <View className="flex-row items-center justify-between py-5">
      <View className="gap-1">
        <Text className="text-primary font-senExtraBold font-extrabold uppercase">
          App name
        </Text>
        <Text className="text-[#676767] font-senRegular">simple moto</Text>
      </View>
      <View >
        <UserCircle2 size={30} color="#676767" />
      </View>
    </View>
  );
};

export default AppHeader;
