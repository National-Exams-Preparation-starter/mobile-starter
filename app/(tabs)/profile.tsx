import AppLayout from '@/components/common/AppLayout'
import UserProfile from '@/components/common/UserProfile'
import { View } from '@/components/Themed'

import React from 'react'
import { Text } from 'react-native'

const profile = () => {
  return (
    <AppLayout>
      {/* profile header */}
        <View className='flex-row items-center justify-center'>
          <Text className='text-xl font-bold font-senBold'>Profile</Text>
        </View>
        <View className='flex-1 py-10'>
          <UserProfile/>
        </View>
    </AppLayout>
  )
}

export default profile;