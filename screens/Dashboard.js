import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Button

} from 'react-native'

export default function Dashboard ({ navigation, route }) {
  const baseURL = 'https://www.breakingbadapi.com/api/'
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch(`${baseURL}characters`)
      .then(resp => {
        if (!resp.ok) throw new Error(resp.statusText)
        return resp.json()
      })
      .then(data => {
        let results = data.map((item, index) => {
          return { ...item, key: index + 7 }
        })
        setCharacters(results)
      })
      .catch(console.error)
  }, [])
  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <Button title="Go to JourneyScreen" onPress={()=>{
                navigation.navigate('Journey', {timmy: Date.now()})
            }}></Button>
      <FlatList
        data={characters}
        renderItem={item => <Character character={item} />}
      />
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}
function Character ({ character }) {
  //props.character
  //props.character.item  props.character.index
  return (
    <View style={styles.row}>
      <Text>{character.item.name}</Text>
    </View>
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
    margin: '10%'
  }
})
