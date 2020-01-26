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
          <TouchableOpacity  style={{height:null,width:null,marginRight:7}} onPress={()=>Haptics.impactAsync('light')}>
            <View style={{height:180,width:110,
                    shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowRadius: 6,
                        shadowOpacity: 0.6}}>
                <View style={{flex:1}}>
                  <Image source={{uri:item.picture.large}}style={{flex:1,height:null,width:null,resizeMode:'cover',borderRadius:20}}/>
                  <LinearGradient
                        colors={['transparent','rgba(0,0,0,0.4)', ]}
                        style={{
                            position: 'absolute',
                            height:180,
                            width:110,
                            borderRadius:20}}
                    />
                    <Text style={{position:'absolute',color:'white',top:150,fontSize:12,alignSelf:'center',fontFamily:'Nunito'}}>
                        {item.name.first}
                    </Text>
                    <Image style={{height:50,width:50,borderRadius:25,
                        position:'absolute',
                        alignSelf:'center',
                        borderWidth:.5,
                        borderColor:'black',
                        top:65}} source={{uri:item.picture.thumbnail}}/>
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

            <FeedScreenCircle/>

            <View style={{flex:1}}>

                <FeedTitleHello/>
    
                <FeedTitleUserName/>

            <ScrollView scrollEventThrottle={16}>

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

                <Card style={{flex: 1}}>
                    <CardItem>
                    <Body style={{flexDirection:'row'}}>
                        <Image style={{height:300,width:width/1.5,borderRadius:20}} source={require('../assets/pic2.jpeg')}/>
                        <Right>
                            <View style={{flex:1, justifyContent:'flex-start'}}>
                                <TouchableOpacity style={{paddingRight:20}}>
                                    <MaterialCommunityIcons name='dots-vertical' size={20}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{paddingRight:20}}>
                                    <MaterialCommunityIcons name='heart-outline' size={20}/>
                                </TouchableOpacity>
                                <Text style={{paddingRight:20}}>
                                    12
                                </Text>
                                <TouchableOpacity style={{paddingRight:20}}>
                                    <MaterialCommunityIcons name='message-outline' size={20}/>
                                </TouchableOpacity>
                                <Text style={{paddingRight:20}}>
                                    56
                                </Text>
                            </View>
                        </Right>
                    </Body>

                    </CardItem>
                    <Right style={{alignSelf:"flex-end", paddingRight:20}}>
                        <Text style={{fontFamily:'Nunito',fontSize:14,color:'rgb(117,117,117)',fontWeight:'bold'}}> 2 hours ago </Text>
                    </Right>
                </Card>

            </ScrollView>

            </View>
        </SafeAreaView>
    )
}
export default FeedScreen;

const styles = StyleSheet.create({})
