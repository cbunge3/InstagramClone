import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const Messages = ({ navigation }) => (
    <View style={styles.container}>
        <Text>Messages</Text>
    </View>
    )
export default Messages;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    }
});