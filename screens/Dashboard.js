import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { FAB } from 'react-native-elements'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable
} from 'react-native'

export default function Dashboard ({ navigation, route }) {
  
  
  function goToJourney (obj) {
    console.log(obj)
    navigation.navigate('Journey',{journey: {obj}})
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      
      <FAB
        visible={true}
        icon={{ name: 'add', color: 'white' }}
        onPress={() => {
          goToJourney()
        }}
        style={styles.fab}
      />
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  row: {
    margin: 20,
    backgroundColor: 'beige',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300
  },
  fab: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: '9%',
    paddingTop: '3%'
  }
})
