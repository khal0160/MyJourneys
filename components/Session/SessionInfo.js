import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import StopwatchContainer from '../StopwatchContainer'

import { Polyline } from 'react-native-maps'
import MapView from 'react-native-maps'
import { useJourneys } from '../../context/JourneysContext'
import timeFormatter from '../../utils/utils'

export default function SessionInfo ({ goToDashboard }) {
  const { currentJourney, setReadySession, deleteJourneysObj } = useJourneys()

  const { item } = currentJourney

  console.log('current journey obj', currentJourney)

  const coordsForMap = {
    latitude: item.locationArray[item.locationArray.length - 1].latitude,
    longitude: item.locationArray[item.locationArray.length - 1].longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  async function handleDelete (obj) {
    await deleteJourneysObj(obj)
    goToDashboard()
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={currentJourney && coordsForMap}
      >
        <Polyline
          coordinates={
            currentJourney.locationArray && currentJourney.locationArray
          }
          strokeWidth={styles.polyline.width}
          strokeColor={styles.polyline.color}
        />
      </MapView>
      <Text style={styles.row}>Time: {timeFormatter(item.time)}</Text>
      <Text style={styles.row}>Start: </Text>
      <Text style={styles.row}>Latitude: {item.locationArray[0].latitude}</Text>
      <Text style={styles.row}>
        Longitude: {item.locationArray[0].longitude}
      </Text>

      <Text style={styles.row}>End:</Text>
      <Text style={styles.row}>
        Latitude: {item.locationArray[item.locationArray.length - 1].latitude}
      </Text>
      <Text style={styles.row}>
        Longitude: {item.locationArray[item.locationArray.length - 1].latitude}
      </Text>
      <View style={styles.buttonRow}>
        <Button
          style={styles.button}
          title='Continue'
          onPress={() => setReadySession(true)}
        />
        <Button
          style={styles.button}
          title='Delete'
          onPress={() => handleDelete(currentJourney)}
        />
      </View>
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
    textAlign: 'center'
  },
  polyline: {
    width: 2,
    color: '#1c5469'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  row: {
    margin: 5,

    height: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 350,
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingLeft: 30
  },
  fab: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: '9%',
    paddingTop: '3%'
  },

  text: {
    paddingVertical: 4
  },
  buttonRow: {
	flexDirection: 'row',
	marginTop: 20
  },
  button: {
	
  }
})
