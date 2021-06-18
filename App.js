import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import DrawerNavigator from './Navigation/DrawerNavigation';


export default function App() {
  return (
   <NavigationContainer>
     <DrawerNavigator/>
   </NavigationContainer>
  );
}