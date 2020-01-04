import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity,Animated,Dimensions, TouchableWithoutFeedback, PanResponder, ActivityIndicator,ScrollView,SafeAreaView } from "react-native";
import * as Font from 'expo-font';


import { f, auth, database, storage } from "../config/config";
import { AppLoading } from "expo";

import { Container, Header,Title, DeckSwiper, Card, CardItem,Left, Right } from 'native-base'

import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics';




const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height


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
 


  renderUsers = () => {
    return imageData.map((item,index) => {
      if( index < currentIndex  )
      {
        return null
      }
      else if (index == currentIndex) {
        return(
          <Animated.View {...panResponder.panHandlers}  key={index} style={[ rotateTranslate, {height:SCREEN_HEIGHT-290,width:SCREEN_WIDTH, paddingHorizontal :10, position:'absolute',paddingBottom: 10,}]}>

              <TouchableWithoutFeedback onPress={()=> {navigation.navigate('Profile')}} style={{position:'absolute', zIndex:100}}>
                <Text style={{top: SCREEN_HEIGHT-340, left: 20, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700', borderColor:'black'}}>{item.name}</Text>
              </TouchableWithoutFeedback>

              <Text style={{top: SCREEN_HEIGHT-340, right: 22, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700'}}>
                {Math.floor(Math.random()*60)+18}
              </Text>
              <Image  style={{ flex:1,height:null, width:null, resizeMode:'cover',borderRadius:20}} source={item.uri}/> 
              {/* //source={{uri: item.url}} */}
              <Animated.View style={{opacity:likeOpacity, transform:[{rotate:'-30deg'}] ,position: 'absolute', top:50, left: 40 , zindex: 150}}>
                <FontAwesome name='thumbs-up' size={70} color='rgb(97,213,185)'/>
              </Animated.View>
              
              <Animated.View style={{ opacity:dislikeOpacity, transform:[{rotate:'30deg'}] ,position: 'absolute', top:50, right: 40 , zindex: 150}}>
                <FontAwesome name='thumbs-down' size={70} color='red'/>
              </Animated.View>       
            
          </Animated.View>
        )
        }
      else {
        return(
          <Animated.View {...panResponder.panHandlers}  key={index} style={[{ transform:[{scale: nextCardScale}],  height:SCREEN_HEIGHT-290,width:SCREEN_WIDTH, paddingHorizontal:10, position:'absolute',paddingBottom: 10,}]}>
            
            <TouchableWithoutFeedback onPress={()=> {navigation.navigate('Profile')}} style={{position:'absolute', zIndex:100}}>
                <Text style={{top: SCREEN_HEIGHT-340, left: 20, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700', borderColor:'black'}}>{item.name}</Text>
              </TouchableWithoutFeedback>

              <Text style={{top: SCREEN_HEIGHT-340, right: 22, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700'}}>
                {Math.floor(Math.random()*60)+18}
              </Text>
              <Image  style={{ flex:1,height:null, width:null, resizeMode:'cover',borderRadius:20}} source={item.uri}/> 
              {/* //source={{uri: item.url}} */}
          </Animated.View>
        )
        
      }
      
    
    }).reverse()
    
  }


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
  const randomColors =colorz[ Math.floor(Math.random()*colorz.length)]
  //'rgb(97,213,185)'

  renderRestaraunts = () => {
    return imageData.map((item,index) => {
      return( //TODO: FIX PADDING ON THE LIST CLIPS CARD ON THE RIGHT, TOO CLOSE TO THE EDGE OF SCREEN
        <TouchableOpacity  key={index} onPress={()=>Haptics.impactAsync('light')} style={{top:4}}>
          <View  style={{height:102,width:70,right:-7,shadowRadius:3,shadowColor:colorz[index],shadowOpacity:1,shadowOffset:{height:0,width:0},}}>
              <View style={{flex:1,marginRight:10,}}>
                <Image source={item.uri} style={{flex:1,height:null,width:null,resizeMode:'cover',borderRadius:15,}}/>
              </View>
          </View>
        </TouchableOpacity>
      )
    })
  }








  renderImages = ({item,index})=> {

      if (index ===currentIndex) {
    return(
    <Animated.View {...panResponder.panHandlers}  key={index} style={[ rotateTranslate, {height:SCREEN_HEIGHT-290,width:SCREEN_WIDTH, paddingHorizontal :10, position:'absolute',paddingBottom: 10,}]}>

              <TouchableWithoutFeedback onPress={()=> {navigation.navigate('Profile')}} style={{position:'absolute', zIndex:100}}>
                <Text style={{top: SCREEN_HEIGHT-340, left: 20, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700', borderColor:'black'}}>{item.name.first}</Text>
              </TouchableWithoutFeedback>

              <Text style={{top: SCREEN_HEIGHT-340, right: 22, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700'}}>
                {/* {Math.floor(Math.random()*60)+18} */}
                {item.dob.age}
              </Text>
              <Image  style={{ flex:1,height:null, width:null, resizeMode:'cover',borderRadius:20}} source={{uri:item.picture.large}}/> 
              {/* //source={{uri: item.url}} */}
              <Animated.View style={{opacity:likeOpacity, transform:[{rotate:'-30deg'}] ,position: 'absolute', top:50, left: 40 , zindex: 150}}>
                <FontAwesome name='thumbs-up' size={70} color='rgb(97,213,185)'/>
              </Animated.View>
              
              <Animated.View style={{ opacity:dislikeOpacity, transform:[{rotate:'30deg'}] ,position: 'absolute', top:50, right: 40 , zindex: 150}}>
                <FontAwesome name='thumbs-down' size={70} color='red'/>
              </Animated.View>       
            
    </Animated.View>
    )
      }
      else {
        return(
          <Animated.View  key={index} style={[{ transform:[{scale: nextCardScale}], nextCardOpacity, height:SCREEN_HEIGHT-290,width:SCREEN_WIDTH, paddingHorizontal:10, position:'absolute',paddingBottom: 10,}]}>
            
            <TouchableWithoutFeedback onPress={()=> {navigation.navigate('Profile')}} style={{position:'absolute', zIndex:100}}>
                <Text style={{top: SCREEN_HEIGHT-340, left: 20, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700', borderColor:'black'}}>{item.name.first}</Text>
              </TouchableWithoutFeedback>

              <Text style={{top: SCREEN_HEIGHT-340, right: 22, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700'}}>
                {/* {Math.floor(Math.random()*60)+18} */}
                {item.dob.age}
              </Text>
              <Image  style={{ flex:1,height:null, width:null, resizeMode:'cover',borderRadius:20}} source={{uri:item.picture.large}}/> 
              {/* //source={{uri: item.url}} */}
          </Animated.View>
        )
      }
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
        <Header  style={{borderBottomWidth:0, height:70,backgroundColor:'#2d3436'}}>
          <Left>
            <Title style={{color:'rgb(97,213,185)',fontSize:20, fontFamily:'Nunito'}}>For You </Title>
          </Left>
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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:'2d3436' }}>
          <ActivityIndicator size='large'/>
        </View>
      ) : (
        <View style={{flex:1,backgroundColor:'#2d3436'}}>
          <View style={{height:120,width:'100%'}}>
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>

              {renderRestaraunts()}

            </ScrollView> 
            </View>


          {/* <View style={{flex:1,justifyContent: 'flex-end',bottom:80}}> */}
          <View style={{flex:1, bottom:0}}>

            {/* {renderUsers()} */}


            <FlatList
          
            keyExtractor={(item,index) => index.toString()}
            data={users}
            renderItem={renderImages}
            />

          </View>

          {/* <View style={{height:215,width:SCREEN_WIDTH}}>
              <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>

                {renderRestaraunts()}

              </ScrollView> 
          </View> */}


        </View>


          // ------------ COMMENTS SECTION - - WILL NEED TO BE REWORKED ------------------------//
            //   <View style={styles.flatlistUserInfoTop}>
            //     <Text>{item.posted}</Text>
            //     <TouchableOpacity onPress={()=> {navigation.navigate('User', {userId: item.authorId})}}>
            //         <Text>{item.author}</Text>
            //     </TouchableOpacity>
            //   </View>

            //   <View>
            //     <Image source={{ uri: item.url }} style={styles.imageSource} />
            //   </View>

            //   <View style={styles.flatlistUserCaption}>
            //     <Text>{item.caption}</Text>
            //     <TouchableOpacity onPress={()=> {navigation.navigate('Comments'), {userId: item.id}}}>
            //       <Text style={styles.flatlistCommentsSection}>
            //         See Comments Below
            //       </Text>
            //     </TouchableOpacity>
            //   </View>

            //   <View 
            //     style={styles.flatlistMainViewBottomBorder}>

            //   </View>

            // </View>

      )}
    {/* </View> */}

    </Container>
  );
};
export default Explore;

const styles = StyleSheet.create({
  mainView: {
    flex: 1
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
  }
});
