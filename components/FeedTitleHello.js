import React from "react";
import { 
    View,
    Text,
    Image,
    TouchableOpacity

} from "react-native";

const FeedTitleHello = () => {
    return(
    <View style={{flexDirection:'row', paddingLeft:20,paddingTop:20}}>
        <Text style={{fontSize:36,fontWeight:'bold', fontFamily:'Nunito',flex: .3}}>
            Hello,
        </Text>
        <View style={{flex:.65,alignItems:'flex-end',justifyContent:'flex-end',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.6,
        }}>
            <TouchableOpacity>
                <Image style={{height:50,width:50,borderRadius:25}} source={require('../assets/pic1.jpeg')}/>
            </TouchableOpacity>
                <View style={{height:15,width:15,borderRadius:7.5,backgroundColor:'rgb(87,117,206)', position:'absolute',bottom:37,right:2}}/>
            
        </View>
    </View>

    )
}
export default FeedTitleHello;
