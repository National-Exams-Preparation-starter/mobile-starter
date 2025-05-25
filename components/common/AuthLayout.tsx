import { StatusBar } from "expo-status-bar";
import React, { FC, ReactNode } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView style={{backgroundColor:'#121223',flex: 1}}>
      <Image source={require("@/assets/images/auth.png")} className="absolute"/>
      {children}
      <StatusBar style="light"/>
    </SafeAreaView>
  );
};

export default AuthLayout;
