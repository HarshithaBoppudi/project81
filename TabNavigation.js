import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Story from '../screens/CreatePost'
import Feed from '../screens/Feed'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
 
const Tab=createBottomTabNavigator()
 const BottomTabNavigator=()=>{
return(
    <Tab.Navigator
    screenOptions={({route})=>(
        {
            tabBarIcon:({focused,color,size})=>{
                let iconName
                if(route.name==='Feed'){
                    iconName=focused?'book':'book-outline'
                    
                }
                else if(route.name==='CreatePost'){
                    iconName=focused?'create':'create-outline'
                }
                return <Ionicons name={iconName} size={size} color={color}/>
            }
        }
    )}
    tabBarOptions={{activeTintColor:'tomato',inactiveTintColor:'grey'}}
    >
        <Tab.Screen name='Feed' component={Feed}/>
        <Tab.Screen name='CreatePost' component={Story}/>

    </Tab.Navigator>
)
}
export default BottomTabNavigator