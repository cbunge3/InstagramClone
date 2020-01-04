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
        const res = await fetch('https://randomuser.me/api/?results=1000')
        res
            .json()
            .then(res => setUsers(res.results))
            .then(res => setIsLoading(false))
    }


    useEffect(()=>{
        getPhotosFromUrl()
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
                        <View>
                            <Image source={{uri:item.picture.large}}style={{resizeMode:'cover',width: '100%', height: 200}}/>
                            <Text>
                                {item.name.first}
                            </Text>
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