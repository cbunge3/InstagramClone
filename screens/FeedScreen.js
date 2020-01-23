import React, {useState,useEffect} from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    FlatList
} from "react-native";
import { 
    Container, 
    Content , 
    Header,
    Title, 
    Left, 
    Right,
    Body } from 'native-base'
import * as Haptics from 'expo-haptics';
import { AppLoading } from "expo";

const { height,width } = Dimensions.get('window')

fetchFontNunito = () => {
    return Font.loadAsync({'Nunito' : require('../assets/Nunito-Light.ttf')})
}

const FeedScreen = ({ navigation }) => {
    const [ fontloaded, setFontLoaded ] = useState(false)
    const [ users, setUsers ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

    getPhotosFromUrl = async () => {
        const res = await fetch('https://randomuser.me/api/?results=10')
        res
            .json()
            .then(res => setUsers(res.results))
            .then(res => setIsLoading(false))
      }
    
    useEffect(()=>{
        getPhotosFromUrl()
    },[])

    flatlistStories = ({item}) => {       
        return(
          <TouchableOpacity  style={{height:180,width:110,marginRight:7,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowRadius: 6,
            shadowOpacity: 0.6,}} onPress={()=>Haptics.impactAsync('light')}>
            <View  style={{height:180,width:110}}>
                <View style={{flex:1}}>
                  <Image source={{uri:item.picture.large}}style={{flex:1,height:null,width:null,resizeMode:'cover',borderRadius:20}}/>
                </View>
            </View>
          </TouchableOpacity>
        )
      }



    if(!fontloaded){
        return(
          <AppLoading 
            startAsync={fetchFontsNunito}
            onFinish={()=> setFontLoaded(true)}
          />
        )
      }

    return(
        <SafeAreaView style={{flex:1}}>

            <View style={{flex:1,paddingLeft:width/1.8,position:'absolute',zIndex:-10}}>
                <View style={{height:350,width:350,borderRadius:175,backgroundColor:'rgb(240,237,237)'}}/>
            </View>

            <View style={{flex:1}}>

                <View style={{flexDirection:'row', paddingLeft:20,paddingTop:20}}>
                    <Text style={{fontSize:42,fontWeight:'bold', fontFamily:'Nunito',flex: .3}}>
                        Hello,
                    </Text>
                    <View style={{flex:.65,alignItems:'flex-end',justifyContent:'flex-end',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowRadius: 6,
                        shadowOpacity: 0.6,
                        }}>
                        <Image style={{height:50,width:50,borderRadius:25}} source={require('../assets/pic1.jpeg')}/>
                        <View style={{height:15,width:15,borderRadius:7.5,backgroundColor:'rgb(87,117,206)', position:'absolute',top:5,right:2}}/>
                    </View>
                </View>

                <View style={{flexDirection:'row', paddingLeft:20}}>
                    <Text style={{fontSize:42,fontWeight:'bold', fontFamily:'Nunito',flex: 1}}>
                        Katherine
                    </Text>
                </View>
                

                <View style={{paddingHorizontal:20}}>
                    <Header transparent>
                        <Left>
                            <Text style={{fontFamily:'Nunito', fontSize:20,fontWeight:'bold'}}>
                                Story
                            </Text>
                        </Left>
                        <Right>
                            <Text style={{fontFamily:'Nunito',fontSize:18,color:'rgb(117,117,117)',fontWeight:'bold'}}>
                                view all
                            </Text>
                        </Right>
                    </Header>
                </View>

                <View style={{flex:1, flexDirection:'row'}}>

                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={users}
                    keyExtractor={(item,index)=> index.toString()}
                    renderItem={flatlistStories}
                    contentContainerStyle={{height:200,paddingVertical:15,paddingHorizontal:20}}
                    ListHeaderComponent={
                        <View  style={{height:180,width:110,marginRight:7,
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowRadius: 6,
                            shadowOpacity: 0.6,}}>
                            <View style={{flex:1}}>
                                <Image source={require('../assets/pic1.jpeg')}style={{flex:1,height:null,width:null,resizeMode:'cover',borderRadius:20,}}/>
                            </View>
                        </View>
                        }
                    />
                    </View>

            </View>
        </SafeAreaView>
    )
}
export default FeedScreen;

const styles = StyleSheet.create({})
