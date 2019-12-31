import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const SquadMembers = (props) => (
    <View style={styles.container}>
        <Text>SquadMembers</Text>
    </View>
    )
export default SquadMembers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    }
});