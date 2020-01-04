import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity
} from "react-native";

import * as Font from 'expo-font';

import { Ionicons } from '@expo/vector-icons'

import { AppLoading } from 'expo'

import { f, auth, database, storage } from '../config/config'


fetchFonts = () => {
    return Font.loadAsync({'Billabong' : require('../assets/Billabong.ttf')})
  }


const Profile = ({ navigation }) => {

    const [loaded, setLoaded] = useState(false)
    const [username, setUsername] = useState('')
    const [name, setName] = useState({})
    const [avatar, setAvatar] = useState({})
    const [fontloaded, setFontLoaded ] = useState(false)

    checkParams = () => {
        let params = navigation.getParam('userId')
        fetchUserInfo(params)
    }

    fetchUserInfo = (userId) => {
        database.ref('users').child(userId).child('username').once('value').then((snapshot)=> {
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
            setUsername(data)

        }).catch(error => console.log(error))

        database.ref('users').child(userId).child('name').once('value').then((snapshot)=> {
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
            setName(data)

        }).catch(error => console.log(error))

        database.ref('users').child(userId).child('avatar').once('value').then((snapshot)=> {
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val()
            setAvatar(data)
            setLoaded(true)

        }).catch(error => console.log(error))


    }

    useEffect(()=> {
        checkParams()
    },[])

    // 'https://api.adorable.io/avatars/285/test@user.i.png'



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

            { loaded == false ? (

                <View style={styles.userProfileLoadingModal}>
                    <Text>Loading....</Text>
                </View>

            ) : (

                <View style={styles.mainView}>

                    <View style={styles.header}>
                        <TouchableOpacity style={{paddingLeft:10}} onPress={()=> {navigation.goBack()}}>
                            <Ionicons name='ios-arrow-back' size={20}/>
                        </TouchableOpacity>
                        <Text style={{fontFamily:'Billabong',fontSize:30,paddingRight:10}}>Profile</Text>
                        <Text></Text>
                    </View>
                    
                    <View style={{justifyContent: 'space-evenly', alignItems:'center', flexDirection:'row', paddingVertical:10}}>
                        <Image source={{ uri: avatar }} style={{marginLeft: 10, width: 100, height:100, borderRadius: 50}}/>

                        <View style={{marginRight:10}}>
                            <Text>{name}</Text>
                            <Text>{username}</Text>
                        </View>
                        
                    </View>

                    {/* <View style={{paddingBottom:20, borderBottomWidth:1}}>
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
                    </View> */}

                    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'lightgrey'}}>
                        <Text>Loading Photos...</Text>
                    </View>
                    
                </View>
             ) }
        </View>
    )
}
export default Profile;

const styles = StyleSheet.create({
    loggedInContainer: {
        flex: 1,
    },
    userProfileLoadingModal:{
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
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 30,
        backgroundColor: "white",
        borderColor: "lightgrey",
        flexDirection:'row'
        
      }
});