import React from "react";
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
    Platform,
} from "react-native";
import {Feather, AntDesign, MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

import { Icon } from 'native-base'


const TabBar = ({ navigation }) => {
    const items = ([
    {
        id: 0,
        name: 'Feed',
        iconName: 'home-outline',
        active: 'home',
        type: 'MaterialCommunityIcons',
        color:'rgb(117,117,117)',
        activeColor:'rgb(255,126,98)'
    },
    {
        id: 1,
        name: 'Squad',
        iconName: 'users',
        active: 'users',
        type: 'Feather',
        color:'rgb(117,117,117)',
        activeColor:'rgb(255,126,98)'
    },
    {
        id: 2,
        name: 'Swiper',
        iconName: 'cards-outline',
        active: 'cards',
        type: 'MaterialCommunityIcons',
        color:'rgb(117,117,117)',
        activeColor:'rgb(255,126,98)'
    },
    {
        id: 3,
        name: 'Restaurants',
        iconName: 'city-variant-outline',
        active: 'city-variant',
        type: 'MaterialCommunityIcons',
        color:'rgb(117,117,117)',
        activeColor:'rgb(255,126,98)'
    },
    {
        id: 4,
        name: 'Profile',
        iconName: 'user',
        active: 'user',
        type: 'Feather',
        color:'rgb(117,117,117)',
        activeColor:'rgb(255,126,98)'
    }])

    return (
        <View
          style={{
            height: 70,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'rgb(254,254,254)',
          }}>
          {items.map(item => {
            const isActive = navigation.state.index == item.id;
            return (
              <View style={{flex: 1}} key={item.id}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(item.name);
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      paddingTop: 10,
                    }}>
                    <Icon
                      type={item.type}
                      name={isActive ? item.active : item.iconName}
                      color={isActive ? item.activeColor: item.color}
                      style={{fontSize:22,color:isActive ? item.activeColor: item.color}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      );

}
export default TabBar





