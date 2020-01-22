import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const AllStories = ({ navigation }) => (
    <View style={styles.container}>
        <Text>AllStories</Text>
    </View>
    )
export default AllStories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    }
});