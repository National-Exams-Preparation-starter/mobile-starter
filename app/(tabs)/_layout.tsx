import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: { marginTop: 10 },
        tabBarStyle: {
          ...styles.tabContainer,
          backgroundColor: "white",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#FF7622",
        tabBarInactiveTintColor: "#999999",
      }}
      safeAreaInsets={{ bottom: 0 }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="addNew"
        options={{
          tabBarIcon: () => (
            <View
              style={{
                position: "absolute",
                bottom: 1,
                height: 70,
                width: 70,
                borderRadius: 35,
                backgroundColor: "#FF7622",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <TabBarIcon name="plus" color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    marginHorizontal: 10,
    bottom: 25,
    height: 60,
    borderRadius: 25,
  },
});
