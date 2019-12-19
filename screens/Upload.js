import React, { useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    TouchableHighlight,
    Dimensions
} from "react-native";

import { Container, Header, Item, Input, Icon, Button } from 'native-base'


import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';



import { f, auth, database, storage } from '../config/config'
import { Ionicons, Feather,MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";


s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}


uniqueId = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + '-' + s4() + '-' + s4()
}






const Upload = ({ navigation }) => {


    const [loggedIn, setLoggedIn] = useState(false)
    const [ imageId, setImageId ] = useState(uniqueId)
    const [ camPerm, setCamPerm ] = useState(false)
    const [ type, setType ] = useState(Camera.Constants.Type.back)
    const [previewUri, setPreviewUri ] = useState(undefined)




    checkPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        setCamPerm(true)

    }    
    
    snap = async () => {
        if (camera) {
          let photo = await camera.takePictureAsync();
          //alert('photo taken')
          setPreviewUri(photo.uri)
          console.log(photo)
        }
        
      };



    

    findNewImage = async () => {
        checkPermissions()

    }



    useEffect(()=> {
        f.auth().onAuthStateChanged((user)=>{
            if(user){
                setLoggedIn(true)
            }else {
                setLoggedIn(true)
            }
        })
    })

    if(previewUri){
        return(
        <View style={{ flex:1, position:'absolute',zIndex:100, justifyContent: 'space-between', display:'flex'}}>
            <View>
                <Image source={{uri:previewUri}} style={{flex: 1,
                                                        justifyContent: 'flex-end',
                                                        alignItems: 'center',
                                                        height: Dimensions.get('window').height,
                                                        width: Dimensions.get('window').width}}/>
            </View>
            <View style={{flex: 1,flexDirection:'row', marginVertical:60, position: 'absolute',zIndex:200, alignSelf:'center'}}>
                <TouchableOpacity onPress={()=> setPreviewUri(null)}>
                    <Ionicons name='ios-trash' size={40} style={{color:'red', fontWeight:'bold'}}/>
                </TouchableOpacity>
            </View>
        </View>

        )
    } 

    return(
    <View style={styles.container}>

        {loggedIn == true ? (
            <Camera style={{ flex:1, justifyContent: 'space-between',}}  autoFocus={true} type={type} ref={(ref)=>{camera=ref}}>

                <Header searchBar rounded
                    style={{position:'absolute', backgroundColor:'transparent', left:0,right:0,top:0, zIndex:100,alignItems:'center',borderBottomWidth:0}}>

                <View style={{flexDirection:'row', flex:3}}>
                    <Item style={{backgroundColor:'transparent'}}>
                        <Icon name='ios-search' style={{color:'white'}}/>
                        <Input placeholder='Search' placeholderTextColor='white' style={{color:'white'}} />
                    </Item>
                </View>

                <View style={{flexDirection:'row', flex:1, justifyContent:'space-around'}}>
                    <TouchableHighlight>
                        <Icon name='ios-flash' style={{color:'white',fontSize: 24, fontWeight: 'bold',}}/>
                    </TouchableHighlight>
                    <TouchableOpacity>
                        <Icon onPress={()=> setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back)} name='ios-camera' style={{color:'white',fontSize: 24, fontWeight: 'bold',}}/>
                    </TouchableOpacity>
                </View>

                </Header>

                <View style={{flexDirection:'row', justifyContent: 'space-between',alignItems:'flex-end'}}>
                    
                    <AntDesign name='left' onPress={()=> navigation.goBack()} size={40} style={{color:'white', marginBottom: 20, paddingLeft: 20,}}/>
                    <View style={{marginBottom:20}}>
                        <MaterialCommunityIcons onPress={()=>snap()} name='circle-outline' style={{color:'white'}} size={100}/>
                    </View>
                    <MaterialCommunityIcons name='cards' size={40} style={{color:'white', marginBottom: 20, paddingRight: 20,}}/>
                </View>


            </Camera>
          
            // <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
            //     <Text style={{fontSize:30, paddingBottom:15}}>Upload</Text>
            //     <TouchableOpacity onPress={()=> findNewImage()} style={{paddingVertical:10, paddingHorizontal:20, backgroundColor:'lightblue', borderRadius:20}}>
            //         <Text style={{color:'white'}}>Select Photo</Text>
            //     </TouchableOpacity>
            // </View>
        ) : (
            <View>
                <Text>
                    You are not logged in
                </Text>
                <Text>
                    Please log in to upload an image
                </Text>
            </View>
            )
        }
    </View>
    )
}

export default Upload;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});