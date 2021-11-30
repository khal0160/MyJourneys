import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import MapView from "react-native-maps";

export default function Journey ({ navigation, route }) {
  console.log(navigation)
  console.log(route)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journey Page</Text>
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <StatusBar style='auto' />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  mediumPoster: {
    
    width: 350,
    height: 350
  },
  title: {
    paddingVertical: 20
  },
  map: {
    width: 350,
    height: 350
  },
})