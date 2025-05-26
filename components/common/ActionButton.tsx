import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

type Props = {
    name:string;
    handlePress:()=>void;
    isLogout?:boolean;
}
const ActionButton = ({name, handlePress,isLogout=false}:Props) => {
  return (
    <TouchableOpacity
            onPress={() => handlePress()}
            className={`flex-row justify-between items-center my-2 py-3 px-5 rounded-full shadow-sm ${
              isLogout ? "bg-red-100" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-medium ${
                isLogout ? "text-red-600" : "text-gray-800"
              }`}
            >
              {name}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={isLogout ? "rgb(220, 38, 38)" : "#4B5563"} // red-600 or gray-600
            />
          </TouchableOpacity>
  )
}

export default ActionButton

const styles = StyleSheet.create({})