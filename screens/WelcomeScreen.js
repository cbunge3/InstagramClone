import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";


const WelcomeScreen = ({ navigation }) => {
    return(
    <View style={styles.container}>
        <Text>WelcomeScreen</Text>
        <Button title='Login'
        onPress={()=> navigation.navigate('Login')}
        />
        <Button title='Register'
        onPress={()=> navigation.navigate('Register')}
        />


    </View>
    )
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    }
});