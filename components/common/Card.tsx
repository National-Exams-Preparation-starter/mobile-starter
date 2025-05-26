import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Card = () => {
  const router = useRouter();
  return (
    <View className="py-2 px-[10px] border border-gray-200 rounded-lg my-2">
      <View className="w-full h-[200px] rounded-lg overflow-hidden">
        <Image
          source={require("@/assets/images/image.png")}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="py-2 flex-row items-center justify-between w-full">
        <View className="">
          <Text className="text-base font-senBold">Product Name</Text>
          <Text className="text-sm font-senRegular text-[#646982] whitespace-nowrap max-w-[80%] truncate">
            description like money or other description like money or other
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push(`/(tabs)/home/jhgfdhgfdfghjgfdsfgh`)}
          className="rounded-full bg-primary p-4  items-center justify-center"
        >
          <Feather name="arrow-up-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
