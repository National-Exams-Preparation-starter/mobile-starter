import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Button } from "./Button";

const SingleItemContainer = () => {
  const { height: h } = Dimensions.get("screen");
  const router = useRouter();
  return (
    <View className="flex-1 bg-white relative">
      <View
        style={{ height: h * 0.4 }}
        className="rounded-xl overflow-hidden relative"
      >
        <Image
          source={require("@/assets/images/onboarding.jpg")}
          className="w-full h-full"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-16 left-4 z-10 p-4 rounded-full bg-white"
        >
          <ChevronLeft fontSize={24} color={"#000"} />
        </TouchableOpacity>
      </View>
      {/* about the single item */}
      <View className="px-5 py-2">
        <View className="px-4 py-5 bg-gray-50 rounded-lg">
          <Text className="text-xl font-senBold">Product Name</Text>
          <Text className="text-base font-senRegular text-[#646982] mt-1">
            This is a brief description of the product. It provides essential
            details and features.
          </Text>
          <Text className="text-lg font-senBold text-[#FF7622] mt-3">
            $29.99
          </Text>
        </View>
        {/* button container */}
        <View className="flex-row items-center gap-2 mt-5">
          <Button
            title="Delete"
            className="border border-primary bg-white flex-1"
            textStyle="!text-primary"
          />
          <Button title="Update" className="flex-1" />
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

export default SingleItemContainer;
