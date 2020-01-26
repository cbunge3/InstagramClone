
import React from "react";
import { 
    View,
    Dimensions
} from "react-native";

const { width } = Dimensions.get('window')

const FeedScreenCircle = () => {
    return(
        <View style={{flex:1,paddingLeft:width/1.97,position:'absolute',zIndex:-10}}>
            <View style={{height:300,width:300,borderRadius:150,backgroundColor:'rgb(240,237,237)'}}/>
        </View>
    )
}
export default FeedScreenCircle;