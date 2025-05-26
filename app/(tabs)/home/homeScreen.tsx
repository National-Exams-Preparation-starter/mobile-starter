import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppLayout from '@/components/common/AppLayout'
import {UserCircle2} from "lucide-react-native"
import AppHeader from '@/components/common/AppHeader'
import HomeContainer from '@/components/common/HomeContainer'

const homeScreen = () => {
  return (
    <AppLayout>
        <AppHeader/>
        <HomeContainer/>
    </AppLayout>
  )
}

export default homeScreen;