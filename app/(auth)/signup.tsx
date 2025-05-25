import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import React from "react";
import AuthLayout from "@/components/common/AuthLayout";
import RegisterForm from "@/components/auth/SignUpForm";

const signup = () => {
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="justify-center items-center gap-2 pt-24 pb-5">
          <Text className="text-3xl font-bold font-senBold text-white">
            Sign Up
          </Text>
          <Text className="text-base font-senRegular font-normal text-center text-white">
            Join us Today and start enjoying our services
          </Text>
        </View>
        <View className="w-full flex-1 bg-white rounded-t-3xl p-6">
          <RegisterForm />
        </View>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
};

export default signup;
