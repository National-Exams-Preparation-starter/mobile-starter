import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import React from "react";
import AuthLayout from "@/components/common/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const login = () => {
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="justify-center items-center gap-2 pt-24 pb-5">
          <Text className="text-3xl font-bold font-senBold text-white">
            Log In
          </Text>
          <Text className="text-base font-senRegular font-normal text-center text-white">
            Please sign in to your existing account
          </Text>
        </View>
        <View className="w-full flex-1 bg-white rounded-t-3xl p-6">
          <LoginForm />
        </View>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
};

export default login;
