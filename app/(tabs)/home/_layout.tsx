import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName="homeScreen"
      >
        <Stack.Screen name="homeScreen" />
        <Stack.Screen name="updateScreen" />
      </Stack>
    </>
  );
};

export default HomeLayout;
