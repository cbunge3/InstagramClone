import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

const LoginScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text>LoginScreen</Text>
            <Button title='Go To Feed'
            onPress={()=> navigation.navigate('Feed')}
            />
    
    
        </View>
        )
    }
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    }
});