import React from "react";
import { 
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import { 
    Container, 
    Content , 
    Header,
    Title, 
    Left, 
    Right,
    Body } from 'native-base'

const FeedHeader1 = () => {
    return(
        <View style={{paddingHorizontal:20}}>
            <Header transparent>
                <Left>
                    <Text style={{fontFamily:'Nunito', fontSize:20,fontWeight:'bold'}}>
                        Story
                    </Text>
                </Left>
                <Right>
                    <TouchableOpacity>
                        <Text style={{fontFamily:'Nunito',fontSize:14,color:'rgb(117,117,117)',fontWeight:'bold'}}>
                            view all
                        </Text>
                    </TouchableOpacity>
                </Right>
            </Header>
        </View>
    )
}
export default FeedHeader1;
