
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,StatusBar,Platform,Image,FlatList, ScrollView, TouchableOpacity,Button} from 'react-native';
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Speech from 'expo-speech'
import firebase from "firebase"

let costumFonts={'Bubblegum-Sans':require('../assets/BubblegumSans-Regular.ttf')}

export default class PostScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      fontsLoded:false,
      speakerColor:'gray',
      speakerIcon:'volume-high-outline',
      lightTheme:true
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
  async initiateTTS(title,author,description){
      const currentColor=this.state.speakerColor
      this.setState({
          speakerColor:currentColor==='gray'?'aqua':'gray'
      })
      if(currentColor==='gray'){
          Speech.speak(`${title} by ${author}`)
          Speech.speak(description)
          
         }
         else{
             Speech.stop()
         }
  }

  
    render(){
      const stories=this.props.route.params.story
        if(!this.props.route.params){
            this.props.navigation.navigate("Home")
        }
         else if(!this.state.fontsLoded){
           return( 
             <AppLoading/>
           )
         }
       else{
        let previewImages={
          image_1:require('../assets/image_1.jpg'),
          image_2:require('../assets/image_2.jpg'),
          image_3:require('../assets/image_3.jpg'),
          image_4:require('../assets/image_4.jpg'),
          image_5:require('../assets/image_5.jpg'),
        }
         return(
          <View style={this.state.lightTheme?styles.containerLight:styles.container}>
             <SafeAreaView style={styles.droidView}/>
             <View style={styles.appTitle}>
               <View style={styles.appIcon}>
                 <Image source={require('../assets/logo.png')} style={{width:35,height:35}}/>
                  
               </View>

               <View style={styles.appTitleContainer}>
                 <Text style={this.state.lightTheme?styles.textContainerLight:styles.textContainer}>
                   Spectagram App</Text>

               </View>

             </View>
             <View style={styles.storyContainer}>
              <ScrollView style={this.state.lightTheme?styles.storyCardLight:styles.storyCard}>
                 <Image source={previewImages[stories.previewImage]} style={{width:'100%',height:200}}/>
                 <View style={styles.dataContainer}>
                     <View style={styles.titleTextContainer}>
                         <Text style={this.state.lightTheme?styles.storyTitleTextLight:styles.storyTitleText}>
                               {stories.title}
                         </Text>
                         <Text style={this.state.lightTheme?styles.storyAutherTextLight:styles.storyAuthorText}>
                               {stories.author}

                         </Text>
                         <Text style={this.state.lightTheme?styles.storyAutherTextLight:styles.storyAuthorText}>
                               {stories.created_on}

                         </Text> 

                        </View>
                  <View style={styles.iconContainer}>
                      <TouchableOpacity 
                      onPress={()=>{
                          this.initiateTTS(stories.title,
                           stories.author,
                           stories.title,
                            stories.description
                            )
                      }}
                      >
                          <Ionicons name={this.state.speakerIcon}
                          size={RFValue(30)}
                          color={this.state.speakerColor}
                          style={{margin:RFValue(15)}}
                          />

                      </TouchableOpacity>
                      </View>      
                 </View>
                 <View  style={styles.storyTextContainer}>
                       <Text style={this.state.lightTheme?styles.storyTextLight:styles.storyText}>
                           {stories.title}

                       </Text>
                       <Text style={this.state.lightTheme?styles.storyTextLight:styles.storyText}>
                           {stories.description}

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

              </ScrollView>
             </View>

           </View>
         )
       }



  
  } 
}
const styles=StyleSheet.create({
  droidView:{
    marginTop:Platform.OS==='android'?StatusBar.currentHeight:RFValue(35)
  },
  appTitle:{
    flex:0.05,
    flexDirection:"row",


  },
  appIcon:{
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  appTitleContainer:{
flex:0.7,
justifyContent:'center'
  },
  dataContainer:{
    flexDirection:"row",
    padding:RFValue(20)

  },
  storyContainer:{
      flex:1
  },
  titleTextContainer:{
      flex:0.8
  },
  storyTitleText:{
fontFamily:'Bubblegum-Sans',
fontSize:RFValue(25),
color:'white'
  },
  storyTitleTextLight:{
    fontFamily:'Bubblegum-Sans',
    fontSize:RFValue(25),
    color:'black'
      },
  storyAuthorText:{
    fontFamily:'Bubblegum-Sans',
    fontSize:RFValue(18),
    color:'white'
      },
      storyAuthorTextLight:{
        fontFamily:'Bubblegum-Sans',
        fontSize:RFValue(18),
        color:'black'
          },
  iconContainer:{
      flex:0.2
  } ,
  storyTextContainer:{
padding:RFValue(20)
  }  ,
  storyText :{
    fontFamily:'Bubblegum-Sans',
    fontSize:RFValue(15),
    color:'white'
  },
  storyTextLight:{
    fontFamily:'Bubblegum-Sans',
    fontSize:RFValue(15),
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
    flexDirection:"row",
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
},
containerLight:{
  flex:1,
  backgroundColor:'white'
},
container:{
  flex:1,
  backgroundColor:'#2072d6'
},
textContainer:{
  color:'white',
  fontSize:RFValue(28),
  fontFamily:'Bubblegum_sans'
},
textContainerLight:{
  color:'black',
  fontSize:RFValue(28),
  fontFamily:'Bubblegum_sans'
},
storyCard:{
  margin:RFValue(20),
  backgroundColor:'gray',
  borderRadius:RFValue(20)
},
storyCardLight:{
  margin:RFValue(20),
  backgroundColor:'white',
  borderRadius:RFValue(20)
},




})