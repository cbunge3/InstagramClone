import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const BusinessFeed = ({ navigation }) => (
    <View style={styles.container}>
        <Text>BusinessFeed</Text>
    </View>
    )
export default BusinessFeed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    }
});