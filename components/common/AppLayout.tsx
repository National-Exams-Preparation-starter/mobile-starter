import { StyleSheet, Text, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
};
const AppLayout: FC<Props> = ({ children }) => {
  return <SafeAreaView className="flex-1 bg-white px-5">{children}</SafeAreaView>;
};

export default AppLayout;
