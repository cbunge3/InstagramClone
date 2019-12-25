import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Animated,
    TouchableWithoutFeedback,
    TouchableHighlight
} from "react-native";

import * as Haptics from 'expo-haptics';

import { f, auth, database, storage } from './config/config'

// console.disableYellowBox = true

import Upload from './screens/Upload'
import Profile from './screens/Profile'
import Explore from './screens/Explore'
import UserProfile from './screens/UserProfile'
import Comments from './screens/Comments'
import Messages from './screens/Messages'
import SquadMembers from './screens/SquadMembers'

import AddButton from './components/AddButton'




import {Feather, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const BottomTabNav = createBottomTabNavigator({
  'Gallery': Explore,
  'Upload': Upload,
  'Profile': Profile,
  'Messages': Messages,
  'SquadMembers': SquadMembers
},
{
  tabBarComponent: ({navigation}) => {
    let tintColor = "black";
    let inactiveTintColor = 'red'
    return (
    <View style={{ height: 70, width: "100%", display: "flex", flexDirection: "row", backgroundColor:'#eee' }}>

        <View style={{ flex: 1 }}>
         <TouchableOpacity onPress={()=> { navigation.navigate('Gallery')}} style={{}}>
           <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:10}}>
              <MaterialIcons name='view-headline' size={32}  color={tintColor}/>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex:1, display:'flex', alignItems:'center', top:-30}}>
          <AddButton navigation={ navigation }/>
        </View>

       <View style={{ flex: 1 }}>
         <TouchableOpacity onPress={()=> { navigation.navigate('Profile')}} style={{}}>
           <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:10 }}>
              <Feather  name='user' size={32} color={tintColor}/>
            </View>
        </TouchableOpacity>
      </View>

    </View>
    )
  }
}
)


//DEPRECIATED ------------------------------------------------------------------
const TabStack = createBottomTabNavigator(
  {
    Gallery:
    {
      screen: Explore,
      navigationOptions:{
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="view-headline" size={35} color={tintColor} />
        )
      } 
    },
    Upload: // HOW TO GET THIS BUTTON TO NOT GO TO UPLOAD SCREEN WHEN PRESSED OUTSIDE OF THE PLUS AREA
    {
      screen:Upload, // HOW TO CHANGE THIS TO NOT GO TO BLANK SCREEN
      navigationOptions:{
        tabBarVisible: false,
        tabBarIcon: ({ tintColor }) => (
          <AddButton />
          
        ) //TAB BAR ON PRESS
      }
    },
    Profile:
    {
      // TODO: MAKE OWN BUTTON COMPONENTS FOR EACH TAB ICON
      screen:Profile,
      navigationOptions:{
        tabBarIcon: ({ tintColor}) => (
            <Feather name='user' size={32} color={tintColor}/>
        )
      }
    }
  }, 
  {
    tabBarOptions: {
      // activeTintColor:'red',
      // inactiveTintColor:'black',
      style: {
        backgroundColor:  '#eee',
        borderTopWidth:0,
        height:42,
        paddingTop:10,
  
        
      },
      showLabel: false 
    }
  }
)
//----------------------------------------------------------------------------


const MainStack = createStackNavigator(
  {
    Home:
    {
      screen: BottomTabNav,
      navigationOptions: {}
    },
    User:
    {
      screen: UserProfile,
      navigationOptions: {}
    },
    Comments:
    {
      screen: Comments,
      navigationOptions: {}
    }
  },
  {
    initalRouteName: 'Home',
    mode:'modal',
    headerMode: 'none'
  }
)




// const TabContainer =  createAppContainer(BottomTabNav)
const StackContainer = createAppContainer(MainStack)


export default App = () => {




  login = async () => {
    
    try{
      let user = await auth.signInWithEmailAndPassword('test@user.com','password')
      console.log(user)
    }catch(error){
      console.log(error)
      
    }
  }



  return(
      <StackContainer/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
