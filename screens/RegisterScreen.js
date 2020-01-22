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
            <Button title='Login Screen'
            onPress={()=> navigation.navigate('ViewAll')}
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