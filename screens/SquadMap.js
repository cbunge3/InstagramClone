import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const SquadMap = ({ navigation }) => (
    <View style={styles.container}>
        <Text>SquadMap</Text>
    </View>
    )
export default SquadMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    }
});