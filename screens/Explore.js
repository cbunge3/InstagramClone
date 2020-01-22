import React, { useState, useEffect } from "react";
import { RefreshControl, View, Text, StyleSheet, Image, FlatList, TouchableOpacity,Animated,Dimensions, TouchableWithoutFeedback, PanResponder, ActivityIndicator,ScrollView,SafeAreaView } from "react-native";
import * as Font from 'expo-font';
import Swiper from 'react-native-deck-swiper'
import { DrawerActions } from 'react-navigation-drawer';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-snap-carousel';


import { f, auth, database, storage } from "../config/config";
import { AppLoading } from "expo";
import * as Animatable from 'react-native-animatable'

import { Container, Content , List, ListItem ,Header,Title, DeckSwiper, Card, CardItem,Left, Right,Thumbnail, Body } from 'native-base'

import { FontAwesome, Ionicons, Entypo, AntDesign, Foundation, Feather } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics';




const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height


fetchFontsBillaBong = () => {
  return Font.loadAsync({'Billabong' : require('../assets/Billabong.ttf')})
}
fetchFontsNunito = () => {
  return Font.loadAsync({'Nunito' : require('../assets/Nunito-Light.ttf')})
}
fetchFontsMuli = () => {
  return Font.loadAsync({'Muli' : require('../assets/Muli-VariableFont:wght.ttf')})
}
fetchFontsMitr = () => {
  return Font.loadAsync({'Mitr' : require('../assets/Mitr-Light.ttf')})
}


const Explore = ({ navigation }) => {
  const [refresh, setRefresh] = useState(true);
  const [imageArray, setImageArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fontloaded, setFontLoaded ] = useState(false)
  const [pan,setPan] = useState(new Animated.ValueXY())
  const [ currentIndex, setCurrentIndex ] = useState(0)
  const [users, setUsers ] = useState([])
  const [isLoading, setIsLoading ] =useState(true)
  const [ fetching, setFetching ] = useState(false)




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

  

  const rotate = pan.x.interpolate({
    inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
    outputRange:['-10deg','0deg','10deg'],
    extrapolate:'clamp'
  })

  const rotateTranslate = {
    transform:[{
      rotate:rotate
    },...pan.getTranslateTransform()
  ]
  }

  const likeOpacity = pan.x.interpolate({
    inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH],
    outputRange:[0,0,1],
    extrapolate:'clamp'
  })

  const dislikeOpacity = pan.x.interpolate({
    inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH],
    outputRange:[1,0,0],
    extrapolate:'clamp'
  })

  const nextCardOpacity = pan.x.interpolate({
    inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH],
    outputRange:[1,0,1],
    extrapolate:'clamp'
  })

  const nextCardScale = pan.x.interpolate({
    inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH],
    outputRange:[1,0.8,1],
    extrapolate:'clamp'
  })


  
  
  
  
 

    const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {
      dx  : pan.x,
      dy  : pan.y
    }]),
    onPanResponderRelease: (e, gesture) => {

      if(gesture.dx > 120){
        Animated.spring(pan,
          {
            toValue:{x:SCREEN_WIDTH+100,y:gesture.dy}
          }).start(()=> setCurrentIndex(currentIndex+1))
          
          
      } else if( gesture.dx < -120){
        Animated.spring(pan,
          {
            toValue:{x:-SCREEN_WIDTH-100,y:gesture.dy}
          }).start(()=> setCurrentIndex(currentIndex+1))
    
      } else {
        Animated.spring(
          pan,
          {toValue:{x:0,y:0}, friction:4},
        ).start();
      }

    }
  })
  
  










  //https://www.cufonfonts.com/font/billabong

  pluralCheck = s => {
    if (s == 1) {
      return "ago";
    } else {
      return "s ago";
    }
  };

  timeConverter = timestamp => {
    let a = new Date(timestamp * 1000);
  
    let seconds = Math.floor((new Date() - a) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " year" + pluralCheck(interval);
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " month" + pluralCheck(interval);
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " day" + pluralCheck(interval);
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hour" + pluralCheck(interval);
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minute" + pluralCheck(interval);
    }
    return Math.floor(seconds) + " seconds" + pluralCheck(seconds);
  };




//FIREBASE DATA PULL - SAW SOME EASIER WAYS TO GO ABOUT THIS, WILL PROBALY CHANGE IN THE FUTURE
  loadFeed = () => {
    setRefresh(true);
    // setImageArray(imageArray) need to find out why this runs without calling a setState on the array of data

    database
      .ref("photos")
      .orderByChild("posted")
      .once("value")
      .then(function(snapshot) {
        const exists = snapshot.val() !== null;
        if (exists) data = snapshot.val();
        let imageFeed = imageArray;

        for (let image in data) {
          let imageObj = data[image];
          database
            .ref("users")
            .child(imageObj.author)
            .child("username")
            .once("value")
            .then(function(snapshot) {
              data = snapshot.val()
              const exists = snapshot.val() !== null;
              if (exists) data = snapshot.val();
              imageFeed.push({
                id: image,
                url: imageObj.url,
                caption: imageObj.caption,
                posted: timeConverter(imageObj.posted),
                author: data,
                authorId: imageObj.author
              });
              

              setRefresh(false);
              setLoading(false);
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  };

  // --------- TEST DATA --------- //
  const imageData = [
    {id:0, uri: require('../assets/pic1.jpeg'), name: 'Marissa'},
    {id:1, uri: require('../assets/pic2.jpeg'), name: 'John'},
    {id:2, uri: require('../assets/pic3.jpeg'), name: 'Hannah'},
    {id:3, uri: require('../assets/pic5.jpeg'), name: 'Wade'},
    {id:4, uri: require('../assets/puppy.jpg'), name: 'Puppy'},
    {id:5, uri: require('../assets/pic1.jpeg'), name: 'Lisa'},
    {id:6, uri: require('../assets/pic2.jpeg'), name: 'Andrew'},
    {id:7, uri: require('../assets/pic3.jpeg'), name: 'May'},
]

// ------------ END OF TEST DATA ------------- //
 

// ------ Deprecaited -------------//
  // renderUsers = () => {
  //   return imageData.map((item,index) => {
  //     if( index < currentIndex  )
  //     {
  //       return null
  //     }
  //     else if (index == currentIndex) {
  //       return(
  //         <Animated.View {...panResponder.panHandlers}  key={index} style={[ rotateTranslate, {height:SCREEN_HEIGHT-290,width:SCREEN_WIDTH, paddingHorizontal :10, position:'absolute',paddingBottom: 10,}]}>

  //             <TouchableWithoutFeedback onPress={()=> {navigation.navigate('Profile')}} style={{position:'absolute', zIndex:100}}>
  //               <Text style={{top: SCREEN_HEIGHT-340, left: 20, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700', borderColor:'black'}}>{item.name}</Text>
  //             </TouchableWithoutFeedback>

  //             <Text style={{top: SCREEN_HEIGHT-340, right: 22, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700'}}>
  //               {Math.floor(Math.random()*60)+18}
  //             </Text>
  //             <Image  style={{ flex:1,height:null, width:null, resizeMode:'cover',borderRadius:20}} source={item.uri}/> 
  //             {/* //source={{uri: item.url}} */}
  //             <Animated.View style={{opacity:likeOpacity, transform:[{rotate:'-30deg'}] ,position: 'absolute', top:50, left: 40 , zindex: 150}}>
  //               <FontAwesome name='thumbs-up' size={70} color='rgb(97,213,185)'/>
  //             </Animated.View>
              
  //             <Animated.View style={{ opacity:dislikeOpacity, transform:[{rotate:'30deg'}] ,position: 'absolute', top:50, right: 40 , zindex: 150}}>
  //               <FontAwesome name='thumbs-down' size={70} color='red'/>
  //             </Animated.View>       
            
  //         </Animated.View>
  //       )
  //       }
  //     else {
  //       return(
  //         <Animated.View {...panResponder.panHandlers}  key={index} style={[{ transform:[{scale: nextCardScale}],  height:SCREEN_HEIGHT-290,width:SCREEN_WIDTH, paddingHorizontal:10, position:'absolute',paddingBottom: 10,}]}>
            
  //           <TouchableWithoutFeedback onPress={()=> {navigation.navigate('Profile')}} style={{position:'absolute', zIndex:100}}>
  //               <Text style={{top: SCREEN_HEIGHT-340, left: 20, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700', borderColor:'black'}}>{item.name}</Text>
  //             </TouchableWithoutFeedback>

  //             <Text style={{top: SCREEN_HEIGHT-340, right: 22, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700'}}>
  //               {Math.floor(Math.random()*60)+18}
  //             </Text>
  //             <Image  style={{ flex:1,height:null, width:null, resizeMode:'cover',borderRadius:20}} source={item.uri}/> 
  //             {/* //source={{uri: item.url}} */}
  //         </Animated.View>
  //       )
        
  //     }
      
    
  //   }).reverse()
    
  // }


  const restarauntData = [
    {id:0, uri: require('../assets/restaraunts/dinner1.jpg')},
    {id:1, uri: require('../assets/restaraunts/dinner2.png')},
    {id:2, uri: require('../assets/restaraunts/dinner3.jpg')},
    {id:3, uri: require('../assets/restaraunts/dinner4.jpg')},
    {id:4, uri: require('../assets/restaraunts/dinner5.png')},
    {id:5, uri: require('../assets/restaraunts/dinner1.jpg')},
    {id:6, uri: require('../assets/restaraunts/dinner2.png')},
    {id:7, uri: require('../assets/restaraunts/dinner3.jpg')}
]
  let colorz = ['#6c5ce7','#e84393','#81ecec','#0984e3','#d63031','#fd79a8','#00b894','#dfe6e9']
  const randomColors =colorz[ Math.floor(Math.random()*users.length)]
  
  //'rgb(97,213,185)'


  flatlistRestaraunts = ({item}) => {
      let colorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
     
      return( //TODO: FIX PADDING ON THE LIST CLIPS CARD ON THE RIGHT, TOO CLOSE TO THE EDGE OF SCREEN
        <TouchableOpacity  style={{left:10,paddingHorizontal:5,height:50,width:60}} onPress={()=>Haptics.impactAsync('light')}>
          <View  style={{height:50,width:50}}>
              <View style={{flex:1}}>
                <Image source={{uri:item.picture.large}}style={{flex:1,height:null,width:null,resizeMode:'cover',borderRadius:25}}/>
              </View>
          </View>
        </TouchableOpacity>
      )
    }

  RenderCard = ({users}) => {
    //style={{height:SCREEN_HEIGHT-310,
    return(
    <View  style={{height:SCREEN_HEIGHT-260,width:'100%',shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 6,
      shadowOpacity: 0.3,
      elevation: 2,}}
    >

      <TouchableWithoutFeedback style={{position:'absolute', zIndex:100}}>
        <Text style={{top: SCREEN_HEIGHT-360, left: 20, color:'white', position:'absolute', zIndex:100, fontSize:30, fontFamily:'Nunito', borderColor:'black'}}>{users.name.first}</Text>
      </TouchableWithoutFeedback>
      <Text style={{top: SCREEN_HEIGHT-320, left: 20, color:'white', position:'absolute', zIndex:100, fontSize:15, fontFamily:'Nunito',fontWeight:'700'}}>
        {users.dob.age} • {users.location.city}, {users.location.state}
      </Text>
      <Image  style={{ flex:1,height:null, width:null, resizeMode:'cover',borderRadius:20}} source={{uri:users.picture.large}}/> 
      <LinearGradient
          colors={['transparent','rgba(0,0,0,0.8)', ]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height:300,
            borderRadius:20
         
          }}
        />
  
    </View>
    )
  }


  CarosuelComponent = () => {
    return(
    <Carousel
    ref={(c) => { carousel = c; }}
    layout={'stack'} 
    layoutCardOffset={290}
    data={users}
    sliderWidth={400}
    itemWidth={400}
    swipeThreshold={60}
    inactiveSlideOpacity={0.9}
    enableSnap={true}
    renderItem={renderCarosuel}
  />
    )
  }

  renderCarosuel = ({ item }) => {
    return(
    <View style={{alignItems:'center',marginVertical:10,shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.4}}>
      <Image  style={{height:SCREEN_HEIGHT-400, width: 300, borderRadius: 25}} source={{uri:item.picture.large}}/> 
      <LinearGradient
          colors={['transparent','rgba(0,0,0,0.4)', ]}
          style={{
            position: 'absolute',
        
            height:SCREEN_HEIGHT-400,
            width:300,
            borderRadius:20
         
          }}
        />
    </View>
    )
  }


  //FLATLIST FOR NEW DESIGN CONCEPT
  renderFlatlist = ({item}) => {
    return(
      <View style={{flex:1}}>
       <Content>
         <List>
           <ListItem noBorder style={{borderBottomWidth:0}}avatar>
             <Left style={{paddingLeft:20}}>
             <Thumbnail  style={{height:30, width:30, borderRadius:7}} source={{uri:item.picture.large}}/>

             </Left>
             <Body>
               <Text style={{fontWeight:'bold'}}>{item.name.first}</Text>
               <Text style={{fontSize:10,color:'grey'}} note>{item.gender === 'male' ? 'M': 'F'}, {item.dob.age} • {item.location.city}, {item.location.state}</Text>
             </Body>
             <Right style={{paddingRight:40,justifyContent: 'flex-end',}}>
               <Text style={{fontSize:10,color:'grey'}} note>{item.location.timezone.offset}</Text>
             </Right>
           </ListItem>
           
         </List>
         <View style={{alignItems:'center',justifyContent: 'center',}}>
            {/* <Image  style={{height:400, width: 300, borderRadius: 25}} source={{uri:item.picture.large}}/>  */}
            <CarosuelComponent/>
        </View>
       </Content>
       </View>
    )
  }



  
  //EXTERNAL FONT LOADING METHOD
  if(!fontloaded){
    return(
      <AppLoading 
        startAsync={fetchFontsNunito}
        onFinish={()=> setFontLoaded(true)}
      />
    )
  }

  


  

  //HEADER BAR CONTAINER
  return (
      <Container>

        <Header  style={{borderBottomWidth:0,height:90,backgroundColor:'rgb(254,254,254)'}}>
              <Title style={{color:'rgb(97,213,185)',fontSize:50, fontFamily:'Nunito',marginLeft:10}}>Hello,Cory</Title>
          <Right>
            <TouchableOpacity onPress={()=> navigation.navigate('Messages')}>
              <Feather name='sliders' size={30} color='lightgrey' style={{marginRight:10}}/>
            </TouchableOpacity>
          </Right>
        
          {/* <Body style={{borderWidth:1,borderColor:'red'}}> */}
            {/* <Title style={{color:'rgb(97,213,185)' ,bottom:10,fontSize:30, fontFamily:'Billabong'}}>For You</Title> */}
          {/* </Body> */}
        </Header>

      
    {/* // <View style={styles.mainView}>

    //   <View style={styles.header}>
    //     <View style={{flex:1,justifyContent: 'center'}}>
    //       <Text style={{fontSize:30, fontFamily:'Billabong', alignSelf:'center',left:20}}>
    //         Gallery
    //       </Text>
    //     </View>
    //     <View style={{justifyContent: 'center',paddingRight:10}}>
    //       <Image source={require('../assets/pic1.jpeg')} style={{height:30,width:30,borderRadius:15,alignSelf:'flex-end'}}/>
    //     </View>
    //   </View> */}

      {loading == true ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:'#eee' }}>
          <ActivityIndicator size='large'/>
        </View>
      ) : (
      <ScrollView style={{backgroundColor:'rgb(254,254,254)'}}>
        <View style={{flex:1,backgroundColor:'rgb(254,254,254)'}}>
          <View style={{right:5,justifyContent: 'center', flexDirection:'row',paddingHorizontal:30}}>

            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={users}
              keyExtractor={(item,index)=> index.toString()}
              renderItem={flatlistRestaraunts}
              contentContainerStyle={{height:80,paddingVertical:15,paddingRight:10}}
              ListHeaderComponent={
                <View  style={{height:50,width:50,left:5}}>
                  <View style={{flex:1}}>
                    <Image source={require('../assets/pic1.jpeg')}style={{flex:1,height:null,width:null,resizeMode:'cover',borderRadius:25,}}/>
                    {/* <TouchableWithoutFeedback style={{position:'absolute',zIndex:100}} onPress={()=> navigation.navigate('Upload')} onPressIn={()=>Haptics.impactAsync('light')} > */}
                      {/* <View style={{borderColor: 'rgb(97,213,185)', borderWidth:2,height:40,width:40,borderRadius:25,backgroundColor:'white',position:'absolute',bottom:5,right:11}}>
                        <Entypo style={{zIndex:100,position:'absolute',margin:3}} name='plus' size={30} color='rgb(97,213,185)'/>
                      </View> */}
                  </View>
                </View>
                }
              />

              
          </View>
       
        


          <View style={{flex:1,}}>
            <View style={{borderWidth:1,borderColor:'red',height:50}}>
              <View style={{flexDirection:'row',top:7}}>
                <View style={{paddingLeft:50}}>
                  <Text>
                  •
                  </Text>
                </View>
                <View style={{paddingLeft:75}}>
                  <Text>
                  •
                  </Text>
                </View>
                <View style={{paddingLeft:65}}>
                  <Text>
                  •
                  </Text>
                </View>
              </View>
                <View style={{flexDirection:'row',top:10}}>
                  <View style={{paddingLeft:30}}>
                    <Text style={{fontFamily:'Nunito'}}>Popular</Text>
                  </View>
                  <View style={{paddingLeft:30}}>
                    <Text style={{fontFamily:'Nunito'}}>Trending</Text>
                  </View>
                  <View style={{paddingLeft:30}}>
                    <Text style={{fontFamily:'Nunito'}}>New</Text>
                  </View>
                </View>
            </View>

            <View style={{flex:1, borderColor:'blue',borderWidth:1}}>

                <FlatList
                data={users}
                keyExtractor={(item,index) => index.toString()}
                renderItem={renderFlatlist}
                />
            </View>
            {/* <View style={{top:-60}}> 
              <Swiper
             
              animateCardOpacity={true}
              verticalThreshold={SCREEN_HEIGHT/2}
              horizontalThreshold={SCREEN_WIDTH/3}
              disableBottomSwipe
              cards={users}
              renderCard={(users) => <RenderCard users={users}/> }
              cardIndex={0}
              backgroundColor='#2d3436'
              stackSize={3}
              infinite
              onTapCard={()=>alert('Profile Name Age')}
              showSecondCard
              stackAnimationFriction={7}
              animateOverlayLabelsOpacity
              overlayLabels={{
                left:{
                  title:'NOPE',
                  style:{
                    wrapper: styles.overlayWrapper,
                  }
                }
              }}
              />
            </View> */}
        </View>

          {/* <View style={{height:215,width:SCREEN_WIDTH}}>
              <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>

                {renderRestaraunts()}

              </ScrollView> 
          </View> */}

      
        </View>
      </ScrollView>
      

      )}
     


    </Container>
  );
};
export default Explore;

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  container: {
    flex: 1,
    bottom:-59,
   
  },
  header: {
    height: 90,
    // borderBottomWidth: 0.5,
    // justifyContent: "center",
    // alignItems: 'center',
    paddingTop: 30,
    backgroundColor: "white",
    borderColor: "lightgrey",
    flexDirection:'row',
  
  },
  flatlistMainViewBottomBorder: {
    borderColor: "lightgrey",
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
  imageSource: {
    resizeMode: "cover",
    width: "97.7%",
    height: 275,
    marginLeft: 4.5,
    borderRadius: 7
  },
  flatlistMainView: {
    width: "100%",
    overflow: "hidden",
    marginBottom: 5,
    justifyContent: "space-between"
  },
  flatlistUserInfoTop: {
    padding: 5,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  flatlistUserCaption: {
    padding: 5
  },
  flatlistCommentsSection: {
    marginTop: 10,
    textAlign: "center",
    color:'lightblue'
  },
  overlayWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: -30,
  },
});
