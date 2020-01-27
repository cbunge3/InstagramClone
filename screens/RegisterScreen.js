import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

const RegisterScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text>RegisterScreen</Text>
            <Button title='Welcome'
            onPress={()=> navigation.navigate('Welcome')}
            />
    
    
        </View>
        )
    }
export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee'
    }
});