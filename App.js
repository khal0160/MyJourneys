
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/Dashboard';
import Journey from './screens/Journey';


const Stack = createStackNavigator();
const headerOpts = {
  headerStyle: { backgroundColor: 'grey' },
  headerTintColor: 'white'
}
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} 
        options={{
          ...headerOpts,
          title: 'Dashboard'
        }}
        />
        <Stack.Screen name="Journey" component={Journey} 
        options={{
          ...headerOpts,
          title: 'Journey'
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}