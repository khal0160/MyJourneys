import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function Journey ({ navigation, route }) {
  console.log(navigation)
  console.log(route)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journey Page</Text>
      
      <StatusBar style='auto' />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mediumPoster: {
    
    width: 350,
    height: 350
  },
  title: {
    paddingVertical: 20
  }
})