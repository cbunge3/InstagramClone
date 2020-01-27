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
    FlatList,
    Platform
} from "react-native";
import { 
    Container,
    Card,
    CardItem,
    Thumbnail,
    Content , 
    Header,
    Title, 
    Left, 
    Right,
    Body } from 'native-base'
import * as Haptics from 'expo-haptics';
import { AppLoading } from "expo";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import FeedHeader1 from '../components/FeedHeader1'
import FeedTitleHello from '../components/FeedTitleHello'
import FeedTitleUserName from '../components/FeedTitleUserName'
import FeedScreenCircle from '../components/FeedScreenCircle'



const { height,width } = Dimensions.get('window')

fetchFontNunito = () => {
    return Font.loadAsync({'Nunito' : require('../assets/Nunito-Light.ttf')})
}

const FeedScreen = ({ navigation }) => {
    const [ fontloaded, setFontLoaded ] = useState(false)
    const [ users, setUsers ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

 


//`https://api.unsplash.com/search/photos?page=5&per_page=30
//https://api.unsplash.com/photos/random?count=30

    const axios = require('axios');
    loadWallpapers = () => {
        axios
          .get(
            `https://api.unsplash.com/photos/random?count=30&client_id=cdd66b5e10edff3c50766086a5c53464963e241def2f481c8f851f3cd2a3c9d9`
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


    getPhotosFromUrl = async () => {
        const res = await fetch('https://randomuser.me/api/?results=10?page='+page)
        res
            .json()
            .then(res => setUsers(res.results))
            .then(res => setIsLoading(false))
      }
    
    useEffect(()=>{
        loadWallpapers()
    },[])

    flatlistStories = ({item}) => {       
        return(
          <TouchableOpacity  style={{height:null,width:null,marginRight:7}} onPress={()=>Haptics.impactAsync('light')}>
            <View style={{height:180,width:110,
                    shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowRadius: 6,
                        shadowOpacity: 0.6}}>
                <View style={{flex:1}}>
                  <Image source={{uri:item.urls.regular}}style={{flex:1,height:null,width:null,resizeMode:'cover',borderRadius:20}}/>
                  <LinearGradient
                        colors={['transparent','rgba(0,0,0,0.4)', ]}
                        style={{
                            position: 'absolute',
                            height:180,
                            width:110,
                            borderRadius:20}}
                    />
                    <Text style={{position:'absolute',color:'white',top:150,fontSize:12,alignSelf:'center',fontFamily:'Nunito'}}>
                        {item.user.first_name}
                    </Text>
                    <Image style={{height:50,width:50,borderRadius:25,
                        position:'absolute',
                        alignSelf:'center',
                        borderWidth:.5,
                        borderColor:'black',
                        top:65}} source={{uri:item.urls.thumb}}/>
                </View>
            </View>
          </TouchableOpacity>
        )
      }

      flatlistActivites = ({item}) => {
          return(
            <Card style={{flex: 1}}>
                <CardItem>
                <Body style={{flexDirection:'row'}}>
                    <Image style={{height:300,width:width/1.5,borderRadius:20}} source={{uri:item.urls.regular}}/>
                    <LinearGradient
                        colors={['transparent','rgba(0,0,0,0.5)', ]}
                        style={{
                            position: 'absolute',
                            top:50,
                            height:250,
                            width:width/1.5,
                            borderRadius:20}}
                    />
                    <View style={{flex:1,position:'absolute',paddingLeft:20}}>
                        <TouchableOpacity>
                            <Text style={{fontFamily:'Nunito', fontSize:20,color:'white',
                            alignSelf:'center',top:260}}>
                                {item.user.first_name}, 23
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Right>
                        <View style={{flex:1, justifyContent:'flex-start'}}>
                            <TouchableOpacity style={{paddingRight:20, paddingBottom:20}}>
                                <MaterialCommunityIcons name='dots-vertical' size={20} color={'rgb(117,117,117)'}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingRight:20}}>
                                <MaterialCommunityIcons name='heart-outline' size={20} color={'rgb(117,117,117)'}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingRight:20}}>
                                <Text style={{textAlign:'center',marginBottom:10,color: 'rgb(117,117,117)', fontSize:12,fontFamily:'Nunito'}}>
                                    {item.likes}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingRight:20}}>
                                <MaterialCommunityIcons name='message-outline' size={20} color={'rgb(117,117,117)'}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingRight:20}}>
                            <Text style={{textAlign:'center',paddingLeft:3,color:'rgb(117,117,117)', fontSize:12,fontFamily:'Nunito'}}>
                                {item.downloads}
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </Right>
                </Body>

                </CardItem>
                <View style={{width:width/1.5,flexDirection:'row',marginLeft:20}}>
                    <Left style={{}}>
                        <View style={{borderColor:'rgb(117,117,117)',borderWidth:.5,paddingVertical:7,paddingHorizontal:15,borderRadius:10}}>
                            <Text style={{color:'rgb(87,117,206)'}}>
                                Work
                            </Text>
                        </View>
                    </Left>
                    <Left style={{}}>
                        <View style={{borderColor:'rgb(117,117,117)',borderWidth:.5,paddingVertical:7,paddingHorizontal:15,borderRadius:10}}>
                            <Text style={{color:'rgb(87,117,206)'}}>
                                Startup
                            </Text>
                        </View>
                    </Left>
                    <Right style={{}}>
                        <View style={{borderColor:'rgb(117,117,117)',borderWidth:.5,paddingVertical:7,paddingHorizontal:15,borderRadius:10}}>
                            <Text style={{color:'rgb(87,117,206)'}}>
                                Fridays
                            </Text>
                        </View>
                    </Right>
                </View>
            
                <Right style={{alignSelf:"flex-end", paddingRight:20}}>
                    <Text style={{fontFamily:'Nunito',fontSize:10,color:'rgb(117,117,117)',fontWeight:'bold',paddingBottom:5}}> 2 hours ago </Text>
                </Right>
        </Card>
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

            <FeedScreenCircle/>

            <View style={{flex:1}}>

                <FeedTitleHello/>
    
                <FeedTitleUserName/>

                <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false} >

                <FeedHeader1/>

                <View style={{height:210,flexDirection:'row'}}>

                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={users}
                    keyExtractor={(item,index)=> index.toString()}
                    renderItem={flatlistStories}
                    contentContainerStyle={{height:200,paddingVertical:15,paddingHorizontal:20}}
                    ListHeaderComponent={
                        <TouchableOpacity>
                            <View  style={{height:180,width:110,marginRight:7,
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowRadius: 6,
                                shadowOpacity: 0.6}}>
                                <View style={{flex:1}}>
                                    <Image source={require('../assets/pic1.jpeg')}style={{flex:1,height:null,width:null,resizeMode:'cover',borderRadius:20,}}/>
                                    <LinearGradient
                                        colors={['transparent','rgba(0,0,0,0.4)', ]}
                                        style={{
                                            position: 'absolute',
                                            height:180,
                                            width:110,
                                            borderRadius:20}}
                                    />
                                        <Text style={{position:'absolute',color:'white',top:150,fontSize:12,alignSelf:'center',fontFamily:'Nunito'}}>
                                            Add to Your Story
                                        </Text>
                                        <Image style={{height:50,width:50,borderRadius:25,
                                            position:'absolute',
                                            alignSelf:'center',
                                            borderWidth:.5,
                                            borderColor:'black',
                                            top:65}} source={require('../assets/pic1.jpeg')}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        }
                    />
                </View>

                <View style={{paddingBottom:10}}>
                    <Header transparent>
                        <Left style={{paddingHorizontal:20}}>
                            <Text style={{fontFamily:'Nunito', fontSize:20,fontWeight:'bold'}}>
                                Activites
                            </Text>
                        </Left>
                        <Right style={{justifyContent:'center'}}>
                            <TouchableOpacity>
                                <Text style={{fontFamily:'Nunito',fontSize:14,color:'rgb(117,117,117)',fontWeight:'bold'}}>
                                    view all
                                </Text>
                            </TouchableOpacity>
                        </Right>
                        <Right style={{}}>
                            <TouchableOpacity style={{borderWidth:.5,borderColor:'rgb(117,117,117)',paddingVertical:7,paddingHorizontal:22,borderRadius:20}}>
                                <Text style={{fontFamily:'Nunito',fontSize:14,color:'rgb(87,117,206)',fontWeight:'bold'}}>
                                    matches
                                </Text>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                </View>

                <FlatList 
                data={users}
                keyExtractor={(item,index) => index.toString()}
                renderItem={flatlistActivites}
                />


                </ScrollView>

            </View>
        </SafeAreaView>
    )
}
export default FeedScreen;

const styles = StyleSheet.create({})
