import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FormInput from "./Input";
import { ArrowBigRight, ArrowLeftRight, ArrowRight } from "lucide-react-native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import Card from "./Card";

const HomeContainer = () => {
    const {width}= Dimensions.get("screen");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View>
      <View className="flex-row items-center gap-1">
        <Text className="text-base font-normal font-senRegular text-[#1E1D1D]">
          Hey Halal,
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
        <ScrollView showsVerticalScrollIndicator={false} className="gap-5 pb-10">
            {/* product card */}
            {[1, 2, 3, 4, 5].map((item) => (
                <Card key={item}/>
            ))}

        </ScrollView>
      </View>
    </View>
  );
};

export default HomeContainer;
