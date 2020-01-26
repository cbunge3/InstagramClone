import React, {useState,useEffect} from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator
    
} from "react-native";

const SquadMembers = (props) => {
    const [users, setUsers ] = useState([])
    const [isLoading, setIsLoading ] =useState(true)

    getPhotosFromUrl = async () => {
        const res = await fetch('https://api.unsplash.com/photos/random?count=30&client_id=cdd66b5e10edff3c50766086a5c53464963e241def2f481c8f851f3cd2a3c9d9')
        res
            .json()
            .then(res => setUsers(res.data))
            .then(res => setIsLoading(false))
    }

    const axios = require('axios');
    loadWallpapers = () => {
        axios
          .get(
            'https://api.unsplash.com/photos/random?count=30&client_id=cdd66b5e10edff3c50766086a5c53464963e241def2f481c8f851f3cd2a3c9d9'
          )
          .then((response) => {
              console.log(response.data);
              setUsers(response.data),
              setIsLoading(false)
            }
          )
          .catch((error) => {
            console.log(error);
          })
          .finally( ()=> {
            console.log('request completed');
          });
      };


    useEffect(()=>{
        loadWallpapers()
    },[])

    return(
        isLoading ?
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size='large' color='black' animating/>
        </View>
        :
        <View>
            <FlatList
                data={users}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item}) => {
                    return(
                        <View style={{flex:1}}>
                            <Image source={{uri:item.urls.regular}}style={{resizeMode:'cover',width: 200, height: 200,borderRadius:100}}/>
                        </View>
                    )
                }}
             />
        </View>
    )
}

export default SquadMembers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});