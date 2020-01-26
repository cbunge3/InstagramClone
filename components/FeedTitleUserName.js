import React from "react";
import { 
    View,
    Text,
} from "react-native";

const FeedTitleUserName = () => {
    return(
        <View style={{flexDirection:'row', paddingLeft:20}}>
            <Text style={{fontSize:36,fontWeight:'bold', fontFamily:'Nunito',flex: 1}}>
                Katherine
            </Text>
        </View>
    )
}
export default FeedTitleUserName;
