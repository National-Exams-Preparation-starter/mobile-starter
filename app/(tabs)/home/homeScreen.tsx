import AppHeader from '@/components/common/AppHeader'
import AppLayout from '@/components/common/AppLayout'
import HomeContainer from '@/components/common/HomeContainer'
import React from 'react'

const homeScreen = () => {
  return (
    <AppLayout>
        <AppHeader/>
        <HomeContainer/>
    </AppLayout>
  )
}

export default homeScreen;