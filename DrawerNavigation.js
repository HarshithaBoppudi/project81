import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import TabNavigator from './TabNavigation'
import Profile from '../screens/Profile'

const Drawer=createDrawerNavigator()
const DrawerNavigator=()=>{
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Home' component={TabNavigator}/>
            <Drawer.Screen name='Profile' component={Profile}/>
        </Drawer.Navigator>
    )
}
export default DrawerNavigator