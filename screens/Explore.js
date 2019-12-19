import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity,Animated,Dimensions, TouchableWithoutFeedback, PanResponder } from "react-native";
import * as Font from 'expo-font';

import { f, auth, database, storage } from "../config/config";
import { AppLoading } from "expo";
// import { DeckSwiper } from 'native-base'

import { FontAwesome } from '@expo/vector-icons'

const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

fetchFonts = () => {
  return Font.loadAsync({'Billabong' : require('../assets/Billabong.ttf')})
}


const Explore = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontloaded, setFontLoaded ] = useState(false)
  const [pan] = useState(new Animated.ValueXY())
  


  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: Animated.event([null, {
      dx  : pan.x,
      dy  : pan.y
    }], {
    }),
    onPanResponderRelease: (e, gesture) => {
        Animated.spring(
          pan,
          {toValue:{x:0,y:0}}
        ).start();
    }
  });

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



  useEffect(() => {
    loadMore()
  }, []);








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
    console.log(a);
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
              console.log(imageFeed)
              console.log(imageArray)
              

              setRefresh(false);
              setLoading(false);
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  };

  loadMore = () => {
    loadFeed();
  };

  // --------- TEST DATA --------- //
  const imageData = [
    {id:'one', uri: require('../assets/pic1.jpeg')},
    {id:'two', uri: require('../assets/pic2.jpeg')},
    {id:'three', uri: require('../assets/pic3.jpeg')},
    {id:'four', uri: require('../assets/pic5.jpeg')},
    {id:'five', uri: require('../assets/puppy.jpg')},
].reverse()

// ------------ END OF TEST DATA ------------- //
 
  renderUsers = () => {
    return imageData.map((item,index) => {
      return(
        <Animated.View {...panResponder.panHandlers}  key={item.id} style={[rotateTranslate,{height:SCREEN_HEIGHT-220,width:SCREEN_WIDTH, padding:10, position:'absolute'}]}>
          <TouchableWithoutFeedback onPress={()=> {navigation.navigate('User', {userId: item.authorId})}} style={{position:'absolute', zIndex:100}}>
            <Text style={{top: SCREEN_HEIGHT-290, left: 15, color:'white', position:'absolute', zIndex:100, fontSize:30, fontWeight:'700', borderColor:'black'}}>{item.author}</Text>
          </TouchableWithoutFeedback>

          <Text style={{top: SCREEN_HEIGHT-255, left: 22, color:'white', position:'absolute', zIndex:100, borderColor:'black'}}>
            {item.posted}
          </Text>
            <Image style={{ flex:1,height:null, width:null, resizeMode:'cover',borderRadius:10}} source={item.uri}/> 
            {/* //source={{uri: item.url}} */}
          <Animated.View style={{opacity:likeOpacity, transform:[{rotate:'-30deg'}] ,position: 'absolute', top:50, left: 40 , zindex: 150}}>
            <FontAwesome name='thumbs-up' size={70} color='#00FF7F'/>
          </Animated.View>

          <Animated.View style={{ opacity:dislikeOpacity, transform:[{rotate:'30deg'}] ,position: 'absolute', top:50, right: 40 , zindex: 150}}>
            <FontAwesome name='thumbs-down' size={70} color='red'/>
          </Animated.View>
          
        </Animated.View>



      )
    })
  }








  

  if(!fontloaded){
    return(
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={()=> setFontLoaded(true)}
      />
    )
  }

  return (
    <View style={styles.mainView}>

      <View style={styles.header}>
        <Text style={{fontSize:30, fontFamily:'Billabong'}}>Gallery</Text>
        <Image />
      </View>

      {loading == true ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={{flex:1, backgroundColor:'#eee'}}>



        <View style={{flex:1}}>

          {renderUsers()}

        </View>


  </View>

//-----------------------------------------------------------------------------//
        // <FlatList
        //   showsVerticalScrollIndicator={false}
        //   refreshing={refresh}
        //   onRefresh={loadMore}
        //   data={imageArray}
        //   keyExtractor={(item, index) => index.toString()}
        //   style={{ flex: 1, backgroundColor: "#eee" }}
        //   renderItem={({ item }) => (
        //     <View style={{flex:1}}>



        //       <View style={{flex:1}}>

        //           <Animated.View style={{height:SCREEN_HEIGHT-220,width:SCREEN_WIDTH, padding:10, position:'absolute'}}>
        //           <TouchableOpacity onPress={()=> {navigation.navigate('User', {userId: item.authorId})}} style={{position:'absolute', zIndex:1000}}>
        //             <Text style={{top: SCREEN_HEIGHT-290, left: 15, color:'white', position:'absolute', zIndex:1000, fontSize:30, fontWeight:'700', borderColor:'black'}}>{item.author}</Text>
        //           </TouchableOpacity>

        //             <Text style={{top: SCREEN_HEIGHT-255, left: 24, color:'white', position:'absolute', zIndex:1000, borderColor:'black'}}>
        //               {item.posted}
        //             </Text>
        //               <Image style={{ flex:1,height:null, width:null, resizeMode:'cover',borderRadius:10}} source={{uri: item.url}}/>
        //           </Animated.View>

        //       </View>

        // </View>
//----------------------------------------------------------------------//









            // <View style={styles.flatlistMainView}>
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




        //   )} // part of flatlist
        // /> // part of flatlist
      )}
    </View>
  );
};
export default Explore;

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  header: {
    height: 90,
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: "white",
    borderColor: "lightgrey"
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
