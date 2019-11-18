import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar,TextInput, Alert  } from 'react-native';
import React,{ Component } from 'react';
import GoogleAutoComplete from './components/GoogleAutoComplete';
import MyClass from './MainFrame';
export default class App extends Component{
    render() {
        return(                   
            <MyClass/>                                                                
        );
    }
}
const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
},
textStyle:{
    fontSize:20,
    fontWeight:"bold"
},
textInputStyle:{
    marginTop:10,    
    alignSelf: 'stretch',
    marginHorizontal:20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da',
},
});
