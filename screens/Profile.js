import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity
} from "react-native";

import { AppLoading } from 'expo'



import { f, auth, database, storage } from '../config/config'


fetchFonts = () => {
    return Font.loadAsync({'Billabong' : require('../assets/Billabong.ttf')})
  }





const Profile = ({ navigation }) => {

    const [loggedIn, setLogIn] = useState(false)
    const [fontloaded, setFontLoaded ] = useState(false)


    useEffect(()=> {
        f.auth().onAuthStateChanged((user)=>{
            if(user){
                setLogIn(true)
            }else{
                setLogIn(false)
            }
        })
    })


    if(!fontloaded){
        return(
          <AppLoading 
            startAsync={fetchFonts}
            onFinish={()=> setFontLoaded(true)}
          />
        )
      }
    


    return(
        <View style={styles.loggedInContainer}>
            {loggedIn == true ? (
                <View style={styles.mainView}>

                    <View style={styles.header}>
                        <Text style={{fontFamily:'Billabong' ,fontSize: 30,}}>Profile</Text>
                    </View>

                    <View style={{justifyContent: 'space-evenly', alignItems:'center', flexDirection:'row', paddingVertical:10}}>
                        <Image source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png' }} style={{marginLeft: 10, width: 100, height:100, borderRadius: 50}}/>

                        <View style={{marginRight:10}}>
                            <Text>Name</Text>
                            <Text>@username</Text>
                        </View>
                        
                    </View>

                    <View style={{paddingBottom:20, borderBottomWidth:1}}>
                        <TouchableOpacity style={{marginTop:10, marginHorizontal:40, paddingVertical:15,borderRadius:20, borderColor:'grey', borderWidth:1.5}}>
                            <Text style={{textAlign:'center',color:'grey'}}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:10, marginHorizontal:40, paddingVertical:15,borderRadius:20, borderColor:'grey', borderWidth:1.5}}>
                            <Text style={{textAlign:'center',color:'grey'}}>
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:10, marginHorizontal:40, paddingVertical:15,borderRadius:20, borderColor:'grey', borderWidth:1.5, backgroundColor:'lightblue'}}
                                            onPress={()=> {
                                                navigation.navigate('Upload')
                                            }}
                            >
                            <Text style={{textAlign:'center',color:'white'}}>
                                Upload New +
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'lightgrey'}}>
                        <Text>Loading Photos...</Text>
                    </View>
                    
                </View>
            ) : (
                <View style={styles.notLoggedInContainer}>
                    <Text>You are not logged in</Text>
                    <Text>Please log in to view your Profile</Text>
                </View>
            )}
        </View>
    )
}
export default Profile;

const styles = StyleSheet.create({
    loggedInContainer: {
        flex: 1,
    },
    notLoggedInContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    mainView:{
        flex:1
    },
    header: {
        height: 90,
        borderBottomWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30,
        backgroundColor: "white",
        borderColor: "lightgrey"
      }
});