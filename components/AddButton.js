import React, { useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";

import * as Haptics from 'expo-haptics';

import * as Animatable from 'react-native-animatable'

import { AntDesign, Entypo, Ionicons }from '@expo/vector-icons'

const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

const AddButton = ({ navigation }) => {


    buttonSize = new Animated.Value(1)
    mode = new Animated.Value(0)
    



    closeButton = () => {
        Animated.timing(mode,{
            toValue: mode._value === 1 ? 0 : 1
        }).start()
    }





    handlePress = () => {
        Animated.sequence([
            Animated.timing(buttonSize, {
                toValue:0.95,
                duration:200
            }),
            Animated.timing(buttonSize, {
                toValue:1
            }),
            Animated.timing(mode,{
                toValue: mode._value === 0 ? 1 : 0
            })
        ]).start()

    }

    const sizeStyle = {
        transform:[{
            scale: buttonSize
        }]
    }

    const rotation = mode.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg','180deg']
    })

    const squadX = mode.interpolate({
        inputRange: [0,1],
        outputRange:[-24,-92]
    })

    const mapX = mode.interpolate({
        inputRange: [0,1],
        outputRange:[-24,-160]
    })

    const messagesX = mode.interpolate({
        inputRange: [0,1],
        outputRange:[-24,44]
    })

    const profileX = mode.interpolate({
        inputRange: [0,1],
        outputRange:[-24,112]
    })



   //WHEN NAVIGATING BETWEEN SCREENS WITH ADDBUTTON COMPONENT OPEN, IT RE RENDERS WITH BUTTON OPEN CAUSING A LAG IN THE VISUALZATION OF THE BUTTON
    return(
        
        <View style={{position:'absolute',alignItems:'center'}}>

            <Animated.View style={{position:'absolute', left: profileX}}>
                <TouchableWithoutFeedback underlayColor='red' onPressIn={()=>Haptics.impactAsync('light')} onPress={()=> {navigation.navigate('Profile')}}>
                    <View style={styles.secondaryButton}>
                        <Entypo name='user' size={27} color='#fd79a8'/>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>

            <Animated.View style={{position:'absolute', left: messagesX}}>
                <TouchableWithoutFeedback underlayColor='red' onPressIn={()=>Haptics.impactAsync('light')} onPress={()=> {navigation.navigate('Messages')}}>
                    <View style={styles.secondaryButton}>
                        <Entypo name='chat' size={27} color='rgb(97,213,185)'/>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>

            <Animated.View style={{position:'absolute', left: mapX}}>
                <TouchableWithoutFeedback underlayColor='red' onPress={()=>Haptics.impactAsync('light')}>
                    <View style={styles.secondaryButton}>
                        <Entypo name='location-pin' size={27} color='#fdcb6e'/>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>

            <Animated.View style={{position:'absolute', left: squadX}}>
                <TouchableWithoutFeedback underlayColor='red' onPressIn={()=>Haptics.impactAsync('light')} onPress={()=> {navigation.navigate('SquadMembers'); closeButton()}} >
                        <View style={styles.secondaryButton}>
                            <Ionicons name='ios-people' size={30} color='#a29bfe'/>
                        </View>
                </TouchableWithoutFeedback>
            </Animated.View>

            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" iterationDelay={3000}>
                <TouchableWithoutFeedback onPress={()=>Haptics.impactAsync('medium')} onPressIn={handlePress} underlayColor='transparent'>
                    <Animated.View style={[ styles.button, sizeStyle ]}> 
                        <Animated.View style={{transform: [{ rotate: rotation }]}}>
                            <Entypo name='chevron-up' size={24} color='white'/>
                        </Animated.View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Animatable.View>

        </View>
    )
}
export default AddButton;

const styles = StyleSheet.create({
    button: {
        marginBottom:40, 
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'rgb(97,213,185)', 
        height:60,
        width:60,
        borderRadius:30,

        // shadowRadius:10,
        // shadowColor:'rgb(97,213,200)',
        // shadowOpacity:0.3,
        // shadowOffset:{height:10},
        //#F02A4B'
    },
    secondaryButton:{
        bottom:-60,
        right: -83.9,
        position:'absolute',
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        height:60,
        width:60,
        borderRadius:30,

        // shadowRadius:10,
        // shadowColor:'rgb(97,213,186)',
        // shadowOpacity:0.3,
        // shadowOffset:{height:10},

    }
});



{/* <View style={{marginBottom:40, justifyContent: 'center',alignItems:'center',backgroundColor:'red', height:60,width:60,borderRadius:30,shadowRadius:10,shadowColor:'#F02A4B',shadowOpacity:0.3,shadowOffset:{height:10}}}>
<AntDesign name='plus' size={24} color='white'/>
</View>  */}