import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ActionButton from "./ActionButton";

const UserProfile = () => {
  const navigationButtons = [
    { title: "Edit Profile", onPress: () => {} },
    { title: "Privacy Settings", onPress: () => {} },
    { title: "Logout", isLogout: true, onPress: () => {} },
  ];

  const handlePress = (title: string) => {
    if (title === "Logout") {
      Alert.alert("Logout", "You have been logged out.");
    } else {
      Alert.alert(title, `You tapped on "${title}".`);
    }
  };

  return (
    <View className="px-4">
      <View className="items-center mt-4 mb-6">
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=2",
          }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-xl font-semibold mt-4">Jane Doe</Text>
        <Text className="text-gray-500">jane.doe@example.com</Text>
      </View>

      <FlatList
        data={navigationButtons}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <ActionButton
            name={item.title}
            handlePress={item.onPress}
            isLogout={item.isLogout}
          />
        )}
      />
    </View>
  );
};

export default UserProfile;
