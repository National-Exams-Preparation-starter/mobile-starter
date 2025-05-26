import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppLayout from '@/components/common/AppLayout';
import AppHeader from '@/components/common/AppHeader';
import AddContainer from '@/components/common/AddContainer';

const addNew = () => {
  return (
    <AppLayout>
      <View className='flex-row items-center justify-center py-5'>
        <Text className='text-lg font-senSemiBold font-semibold text-primary'>Add</Text>
      </View>
      <View style={{ flex: 1 }}> 
        <AddContainer/>
      </View>
    </AppLayout>
  )
}

export default addNew;