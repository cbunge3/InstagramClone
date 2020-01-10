import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';

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
    TouchableHighlight,
    Dimensions
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

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

import {Feather, AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
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
    let tintColor = "rgb(97,213,185)";

    return (
      // <View style={{justifyContent: 'center',alignItems:'center',bottom:30}}>
      //   <AddButton navigation={ navigation }/>
      // </View>

      
    <View style={{ height: 80, width: '100%', display: "flex", flexDirection: "row", backgroundColor:'reg(254,254,254)'}}>

        <View style={{ flex: 1 }}>
         <TouchableOpacity onPress={()=> { navigation.navigate('Gallery')}}>
           <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:7}}>
              <Ionicons name='md-search' size={35}  color={tintColor}/>
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={{flex:1, display:'flex', alignItems:'center'}}>
          <AddButton navigation={ navigation }/>
         
        </View> */}

       <View style={{ flex: 1 }}>
         <TouchableOpacity onPress={()=> { navigation.navigate('Profile')}}>
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




// const drawer = createDrawerNavigator({
//   'Gallery': Explore,
//   'Upload': Upload,
//   'Profile': Profile,
//   'Messages': Messages,
//   'SquadMembers': SquadMembers
// })



const MainStack = createStackNavigator(
  {
    Home:
    {
      screen: BottomTabNav,
      navigationOptions:{}
     
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
  },
  {

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


