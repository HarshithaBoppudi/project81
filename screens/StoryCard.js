import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar,Platform,Image,FlatList,TouchableOpacity} from 'react-native';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading'
import firebase from 'firebase'

import Ionicons from 'react-native-vector-icons/Ionicons'

let costumFonts={'Bubblegum-Sans':require('../assets/BubblegumSans-Regular.ttf')}
let stories=require('./Temp_posts.json')

export default class StoryCard extends React.Component {
    constructor(props){
        super(props)

        this.state={
            fontsLoded:false,
            lightTheme:true,
            story_id:this.props.story.key,
            story_data:this.props.story.value
          }
        }

        fetchUser=()=>{
          let theme
          firebase.database().ref('/users/'+firebase.auth().currentUser.uid).on('value',snapshot=>{
            theme=snapshot.val().current_theme
            this.setState({
              lightTheme:theme==='light'?true:false
            })
          })
        }

        async loadFonts(){
          await Font.loadAsync(costumFonts)
          this.setState({
            fontsLoded:true
          })
        }
        componentDidMount(){
          this.loadFonts()
          this.fetchUser()
        }
        render(){
          let story=this.state.story_data
            if(!this.state.fontsLoded){
              return( 
                <AppLoading/>
              )
            }
          else{
            let preview_Image={
              image_1:require('../assets/image_1.jpg'),
              image_2:require('../assets/image_2.jpg'),
              image_3:require('../assets/image_3.jpg'),
              image_4:require('../assets/image_4.jpg'),
              image_5:require('../assets/image_5.jpg'),
            }
            return(
              <TouchableOpacity style={{flex:1,backgroundColor:'2072d6'}}
              onPress={()=>{
                this.props.navigation.navigate('PostScreen',{story:story})
              }} 
              >
                
               
                <View style={this.state.lightTheme?styles.cardContainerLight:styles.cardContainer}>
       <Image source={preview_Image[story.previewImage]} style={styles.storyImage}/>
         <View style={styles.titleContainer}>
                        <Text style={this.state.lightTheme?styles.titleTextLight:styles.titleText} >
                            {story.title}

                        </Text>
                        <Text style={this.state.lightTheme?styles.aurtherTextLight:styles.aurtherText} >
                            {story.author}

                        </Text>
                        <Text style={this.state.lightTheme?styles.descreptionTextLight:styles.descriptionText} >
                            {story.description}

                        </Text>

                    </View>
                    <View style={styles.actionContainer}>
                        <View style={styles.likeButton}>
                         <Ionicons name={'heart'} size={RFValue(25)} color={this.state.lightTheme?'black':'white'} />
                         <Text style={this.state.lightTheme?styles.likeTextLight:styles.likeText}>
                         12k
                         </Text>
                        </View>

                    </View>
                    </View>
                    </TouchableOpacity>
                    
                    )
                    }
                    }
                    }
                    
const styles=StyleSheet.create({
    cardContainer:{
        margin:RFValue(13),
        backgroundColor:'#254377',
        borderRadius:15

    },
    cardContainerLight:{
      margin:RFValue(13),
      backgroundColor:'white',
      borderRadius:15

  },
    storyImage:{
     resizeMode:'contain',
     width:'95%',
     alignSelf:'center',
     height:RFValue(250)   
    },
    titleContainer:{
        paddingLeft:20,
        justifyContent:'center'
    },
    titleText:{
        fontSize:RFValue(25),
         fontFamily:'Bubblegum-Sans',
         color:'white'
    },
    titleTextLight:{
      fontSize:RFValue(25),
       fontFamily:'Bubblegum-Sans',
       color:'black'
  },
    authorText:{
        fontSize:RFValue(18),
         fontFamily:'Bubblegum-Sans',
         color:'white'
    },
    authorTextLight:{
      fontSize:RFValue(18),
       fontFamily:'Bubblegum-Sans',
       color:'black'
  },
    descriptionText:{
        fontSize:RFValue(13),
         fontFamily:'Bubblegum-Sans',
         color:'white'
    },
    descriptionTextLight:{
      fontSize:RFValue(13),
       fontFamily:'Bubblegum-Sans',
       color:'black'
  },
    actionContainer:{
        padding:RFValue(10),
        justifyContent:'center',
        alignItems:'center'
    },
    likeButton:{
        width:RFValue(160),
        height:RFValue(40),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#e51247',
        flexDirection:'row',
        borderRadius:RFValue(30),

    },
    likeText:{
      color:'white',
      fontFamily:'Bubblegum-Sans',
      fontSize:RFValue(25),
      marginLeft:RFValue(5)
    },
    likeTextLight:{
      color:'black',
      fontFamily:'Bubblegum-Sans',
      fontSize:RFValue(25),
      marginLeft:RFValue(5)
    }

})
                    
                     


