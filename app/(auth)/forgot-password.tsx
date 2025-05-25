import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import AuthLayout from '@/components/common/AuthLayout';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="justify-center items-center gap-2 pt-24 pb-5">
          <Text className="text-3xl font-bold font-senBold text-white">
            Forgot Password
          </Text>
          <Text className="text-base font-senRegular font-normal text-center text-white">
            Enter your email to receive reset Code
          </Text>
        </View>
        <View className="w-full flex-1 bg-white rounded-t-3xl p-6">
          <ForgotPasswordForm/>
        </View>
      </KeyboardAvoidingView>
    </AuthLayout>
  )
}

export default ForgotPassword;