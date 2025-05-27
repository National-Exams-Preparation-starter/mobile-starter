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
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "@/context/auth/AuthProvider";

const UserProfile = () => {
  const router = useRouter();
  const toast = useToast();
  const { setUser, user } = useAuth();

  const navigationButtons = [
    { title: "Edit Profile", onPress: () => {} },
    { title: "Privacy Settings", onPress: () => {} },
    {
      title: "Logout",
      isLogout: true,
      onPress: () => {
        AsyncStorage.removeItem("username");
        setUser(null);
        toast.show("You have been logged out.", { type: "success" });
        // Redirect to login page
        router.push("/login");
      },
    },
  ];

  return (
    <View className="px-4">
      <View className="items-center mt-4 mb-6">
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=2",
          }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-xl font-semibold mt-4">
          {user?.firstname || user?.lastname ? (user?.firstname + " " + user?.lastname) : user?.email.split("@")[0]}
        </Text>
        <Text className="text-gray-500">{user?.email}</Text>
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
