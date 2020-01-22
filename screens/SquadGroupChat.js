import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const SquadGroupChat = ({ navigation }) => (
    <View style={styles.container}>
        <Text>SquadGroupChat</Text>
    </View>
    )
export default SquadGroupChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    }
});