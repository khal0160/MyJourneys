import { StatusBar } from 'expo-status-bar'

import MapView from "react-native-maps";
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function Journey ({ navigation, route }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [sessionStarted, setSessionStarted] = useState(false)

    useEffect(() => {
        (async () => {
          if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
              'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
            );
            return;
          }
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          console.log(location)
          
        })();
      }, []);
    
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }
      function startSession() {
          setSessionStarted(!sessionStarted)
      }
  return (
    <View style={styles.container}>
      
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
      <Text style={styles.paragraph}>{text}</Text>
      <Text style={styles.title}>00:00:00</Text>
      <Button title={ sessionStarted? 'Stop' : 'Start' } onPress={() => startSession()}/>
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
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  }
})