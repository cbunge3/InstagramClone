import React, { useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableHighlight,
    TouchableWithoutFeedback
} from "react-native";

import * as Haptics from 'expo-haptics';

import * as Animatable from 'react-native-animatable'

import { AntDesign, Entypo }from '@expo/vector-icons'



const AddButton = ({ navigation }) => {

    buttonSize = new Animated.Value(1)
    mode = new Animated.Value(0)









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
        outputRange: ['0deg','45deg']
    })

    const cameraX = mode.interpolate({
        inputRange: [0,1],
        outputRange:[-24,-100]
    })

    const mapX = mode.interpolate({
        inputRange: [0,1],
        outputRange:[-24,-170]
    })



    //console.log(navigation);
    return(
        
        <View style={{position:'absolute',alignItems:'center'}}>

            <Animated.View style={{position:'absolute', top: mapX}}>
            <TouchableHighlight underlayColor='red' onPress={()=>Haptics.impactAsync('light')}>
                <View style={styles.secondaryButton}>
                    <Entypo name='location-pin' size={22} color='white'/>
                </View>
            </TouchableHighlight>
            </Animated.View>

            <Animated.View style={{position:'absolute', top: cameraX}}>
            <TouchableWithoutFeedback underlayColor='red' onPressIn={()=>Haptics.impactAsync('light')} onPress={()=> {navigation.navigate('Upload')}}>
                    <View style={styles.secondaryButton}>
                        <AntDesign name='camerao' size={22} color='white'/>
                    </View>
            </TouchableWithoutFeedback>
            </Animated.View>

            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" iterationDelay={500}>
                <TouchableHighlight onPress={()=>Haptics.impactAsync('medium')} onPressIn={handlePress} underlayColor='transparent'>
                    <Animated.View style={[ styles.button, sizeStyle ]}> 
                        <Animated.View style={{transform: [{ rotate: rotation }]}}>
                            <AntDesign name='plus' size={24} color='white'/>
                        </Animated.View>
                    </Animated.View>
                </TouchableHighlight>
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
        backgroundColor:'red', 
        height:60,
        width:60,
        borderRadius:30,
        shadowRadius:10,
        shadowColor:'#F02A4B',
        shadowOpacity:0.3,
        shadowOffset:{height:10},
    },
    secondaryButton:{
        bottom:-83,
        left:-30,
        position:'absolute',
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        height:60,
        width:60,
        borderRadius:30,
        shadowRadius:10,
        shadowColor:'#F02A4B',
        shadowOpacity:0.3,
        shadowOffset:{height:10}

    }
});



{/* <View style={{marginBottom:40, justifyContent: 'center',alignItems:'center',backgroundColor:'red', height:60,width:60,borderRadius:30,shadowRadius:10,shadowColor:'#F02A4B',shadowOpacity:0.3,shadowOffset:{height:10}}}>
<AntDesign name='plus' size={24} color='white'/>
</View>  */}