import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Dimensions,
    Animated
} from "react-native";

import { f, auth, database, storage } from '../config/config'

const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

const Upload = (props) => {

    const [loggedIn, setLoggedIn] = useState(false)


    useEffect(()=> {
        f.auth().onAuthStateChanged((user)=>{
            if(user){
                setLoggedIn(true)
            }else {
                setLoggedIn(false)
            }
        })
    })





    return(
    <View style={styles.container}>
        {loggedIn == true ? (
            <View style={{flex:1}}>

                <View style={{height:60}}>

                </View>

                <View style={{flex:1}}>
                    <Animated.View style={{height:SCREEN_HEIGHT-120,width:SCREEN_WIDTH, padding:10,}}>
                        <Image style={{ flex:1,height:null, width:null, resizeMode:'cover',borderRadius:10}} source={require('../assets/puppy.jpg')}/>
                    </Animated.View>
                </View>

                <View style={{height:60}}>

                </View>

            </View>
        ) : (
            <View>
                <Text>
                    Please log in to post a comment
                </Text>
            </View>
            )
        }
    </View>
    )
}
export default Upload;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});



