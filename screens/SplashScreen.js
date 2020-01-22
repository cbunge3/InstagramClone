import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";


const SplashScreen = ({ navigation }) => {
    return(
    <View style={styles.container}>
        <Text>SplashScreen</Text>
        <Button title='Login Screen'
        onPress={()=> navigation.navigate('Login')}
        />


    </View>
    )
}
export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    }
});