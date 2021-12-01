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
  function goToJourney () {
    navigation.navigate('Journey')
  }
  function Character ({ character }) {
    //props.character
    //props.character.item  props.character.index
    return (
      <View
        style={styles.row}
        onPress={() => {
          goToJourney()
        }}
      >
        <Text>{character.item.name}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <FlatList
        data={characters}
        renderItem={item => (
          <Pressable
            style={styles.row}
            onPress={() => {
              goToJourney()
            }}
          >
            <Character character={item} />
          </Pressable>
        )}
      />
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
