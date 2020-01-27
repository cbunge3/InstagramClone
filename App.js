import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
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
    TouchableOpacity,
    Dimensions,
    Platform
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
import WelcomeScreen from './screens/WelcomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import AllStories from './screens/AllStories'
import SquadMap from './screens/SquadMap'
import SquadGroupChat from './screens/SquadGroupChat'
import BusinessFeed from './screens/BusinessFeed'
import Settings from './screens/Settings'
import FeedScreen from './screens/FeedScreen'
import TabBar from './components/TabBar'

import AddButton from './components/AddButton'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

import {Feather, AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';



const BottomTabNav = createBottomTabNavigator({
  'Gallery': Explore,
  'Upload': Upload,
  'Profile': Profile,
  'Messages': Messages,
  'SquadMembers': SquadMembers
},
{
  tabBarComponent: ({navigation}) => {
    let tintColor = "rgb(117,117,117)";

    return (
      // <View style={{justifyContent: 'center',alignItems:'center',bottom:30}}>
      //   <AddButton navigation={ navigation }/>
      // </View>

      
    <View style={{ height: 70, width: '100%', display: "flex", flexDirection: "row", backgroundColor:'reg(254,254,254)'}}>

        <View style={{ flex: 1 }}>
         <TouchableOpacity onPress={()=> { navigation.navigate('Gallery')}}>
           <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:7}}>
              <MaterialCommunityIcons name='home-outline' size={25}  color={tintColor}/>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
         <TouchableOpacity onPress={()=> { navigation.navigate('Gallery')}}>
           <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:7}}>
              <Feather name='users' size={25}  color={tintColor}/>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
         <TouchableOpacity onPress={()=> { navigation.navigate('Gallery')}}>
           <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:7}}>
              <MaterialCommunityIcons name='cards-outline' size={25}  color={tintColor}/>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
         <TouchableOpacity onPress={()=> { navigation.navigate('Gallery')}}>
           <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:7}}>
              <MaterialCommunityIcons name='store' size={25}  color={tintColor}/>
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={{flex:1, display:'flex', alignItems:'center'}}>
          <AddButton navigation={ navigation }/>
         
        </View> */}

       <View style={{ flex: 1 }}>
         <TouchableOpacity onPress={()=> { navigation.navigate('Profile')}}>
           <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:10 }}>
              <Feather  name='user' size={25} color={tintColor}/>
            </View>
        </TouchableOpacity>
      </View>

    </View>
    )
  }
}
)







const HomeStack = createStackNavigator(
  {
    Feed: FeedScreen,
    ViewAll: AllStories
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,

       
}}
)

const SquadStack = createStackNavigator(
  {
    SquadScreen: SquadMembers,
    SquadMap: SquadMap,
    SquadGroupChatScreen: SquadGroupChat
  }
)

const SwipeDeckStack = createStackNavigator( // TODO: remeber that this is tied to its own stack so it does not follow same rules for header missing
  {
    DeckSwiper: Explore,
    MessageScreen: Messages
  },
)

const RestaurantStack = createStackNavigator(
  {
   BusinessFeed : BusinessFeed
  },
  {
  headerMode: 'none',
  navigationOptions: 
  { 
    tabBarVisible: true,
    headerVisible: false
  } 
  }
)

const ProfileStack = createStackNavigator(
  {
    SettingsScreen: Settings
  }
)


const NewBottomTabNav = createBottomTabNavigator(
  {
    Feed: {
      screen: HomeStack,
    },
    Squad: {
      screen: SquadStack,
    },
    Swiper: {
      screen: SwipeDeckStack,
    },
    Restaurants: {
      screen: RestaurantStack,
    },
    Profile: {
      screen: ProfileStack,
    }
  },  
  {
    tabBarComponent: TabBar
    // tabBarComponent: ({navigation}) => {
    //   let tintColor = "rgb(255,126,98)";
  
    //   return (
    //   <View style={{ height: 70, width: '100%', display: "flex", flexDirection: "row", backgroundColor:'rgb(254,254,254)'}}>
  
    //       <View style={{ flex: 1 }}>
    //        <TouchableOpacity onPress={()=> { navigation.navigate('Feed')}}>
    //          <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:10}}>
    //             <MaterialCommunityIcons name={'home-outline'} size={25}  color="rgb(117,117,117)"/>
    //           </View>
    //         </TouchableOpacity>
    //       </View>
  
    //       <View style={{ flex: 1 }}>
    //        <TouchableOpacity onPress={()=> { navigation.navigate('Squad')}}>
    //          <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:10}}>
    //             <Feather name='users' size={25}  color="rgb(117,117,117)"/>
    //           </View>
    //         </TouchableOpacity>
    //       </View>
  
    //       <View style={{ flex: 1 }}>
    //        <TouchableOpacity onPress={()=> { navigation.navigate('Swiper')}}>
    //          <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:10}}>
    //             <MaterialCommunityIcons name='cards-outline' size={25}  color="rgb(117,117,117)"/>
    //           </View>
    //         </TouchableOpacity>
    //       </View>
  
    //       <View style={{ flex: 1 }}>
    //        <TouchableOpacity onPress={()=> { navigation.navigate('BusinessFeed')}}>
    //          <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:10}}>
    //             <MaterialCommunityIcons name='store' size={25}  color="rgb(117,117,117)"/>
    //           </View>
    //         </TouchableOpacity>
    //       </View>
  
    //      <View style={{ flex: 1 }}>
    //        <TouchableOpacity onPress={()=> { navigation.navigate('Profile')}}>
    //          <View style={{ display: "flex", alignItems: "center", height: "100%",paddingTop:10 }}>
    //             <Feather  name='user' size={25} color="rgb(117,117,117)"/>
    //           </View>
    //       </TouchableOpacity>
    //     </View>
  
    //   </View>
    //   )
    // }
  }
)

const SwitchStackNav = createSwitchNavigator({
  Welcome: WelcomeScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
  bottom: NewBottomTabNav
},
)




const MainStack = createStackNavigator(
  {
    Home:
    {
      screen: SwitchStackNav,
      navigationOptions:
      {}
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



const SwitchContainer = createAppContainer(SwitchStackNav)
//  const TabContainer =  createAppContainer(NewBottomTabNav)
// const StackContainer = createAppContainer(MainStack)


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
      <SwitchContainer/>
  )
}


