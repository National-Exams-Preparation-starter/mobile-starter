import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppLayout from '@/components/common/AppLayout';
import HomeContainer from '@/components/common/HomeContainer';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

const expenses = () => {
    const router = useRouter();
  return (
    <AppLayout>
        <View className="flex-row items-center justify-between relative">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full bg-primary"
        >
          <ChevronLeft size={22} color={"#fff"} />
        </TouchableOpacity>

        <Text className="text-lg font-senSemiBold font-semibold text-primary -ml-5">
          All Your Expenses
        </Text>
        <View />
      </View>
        <HomeContainer/>
    </AppLayout>
  )
}

export default expenses;