import React ,{ Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Platform } from 'react-native';
export default class GoogleAutoComplete extends Component{
    render() {
        return(            
                <GooglePlacesAutocomplete
                    placeholder='Procurar'  
                    placeholderTextColor="#333"                      
                    minLength={3}    
                    onPress={(data, details) =>{                        
                        this.props.valueChanged(details);
                    }}                     
                    query={{                        
                        key: '',
                        language: 'en',                         
                    }}          
                    textInputProps={{
                        autoCapitalize:"none",
                        autoCorrect:false
                    }}                                                 
                    fetchDetails
                    enablePoweredByContainer={false}
                    styles={{
                        container: {
                            position: 'absolute',
                            top: Platform.select({
                                ios : 80,
                                android : 60
                            }),
                            width:'100%',
                          },
                        textInputContainer:{
                            flex : 1,
                            backgroundColor: 'transparent',
                            height : 54,
                            marginHorizontal:20,
                            borderTopWidth:0,
                            borderBottomWidth:0,
                        },
                        textInput:{
                            height : 54,
                            margin:0,
                            borderRadius:0,
                            paddingTop:0,
                            paddingBottom:0,
                            paddingLeft:20,
                            paddingRight:20,
                            marginTop:5,
                            marginLeft:0,
                            marginRight:0,
                            elevation:5,
                            shadowColor:'#000',
                            shadowOpacity:.1,
                            shadowOffset:{x : 0, y : 0},
                            shadownRadius:15,
                            borderWidth:1,
                            borderColor:'#DDD',
                            fontSize:18,
                        },
                        listView:{
                            borderWidth:1,
                            borderColor:'#DDD',
                            backgroundColor:'#FFF',
                            marginHorizontal:20,
                            elevation:5,
                            shadowColor:'#000',
                            shadowOpacity:.1,
                            shadowOffset:{x : 0, y : 0},
                            shadownRadius:15,
                            marginTop:10,
                        },
                        description:{
                            fontSize:16,
                        },
                        row:{
                            padding:10,
                            height:48,
                        },
                    }}
                />
        );
    }
}
