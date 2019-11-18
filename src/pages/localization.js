import React , { Component} from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView, TouchableHighlight } from 'react-native';
import Searcher from '../components/GoogleAutoComplete';
import  Icon  from 'react-native-ionicons';
import DrawerButton from '../components/DrawerButton';

export default class Localization extends Component{
    static navigationOptions = {
        drawerLabel: 'Localization',
        drawerIcon: () => (
            <Icon     
                name="locate"           
                color="#000"
                size={16}                
             />
        ),
    };        
    valueChanged = (value) =>{                
        this.props.locationChanged(value);        
    }
    render(){
        return(        
            <View style={{flex :1}}>
                {/* <DrawerButton navigation={this.props.navigation} /> */}
                <Searcher valueChanged={ this.props.locationChanged}/>  
                <TouchableHighlight onPress={() => {this.props.locationChanged('ola mundo')}} style={styles.btnClickContain} underlayColor='#4cb7f5'>                    
                        <Icon name="done-all"
                        color="#fff"                
                        size={40}
                        />                    
                 </TouchableHighlight>        
            </View>
        );
    }    
}
const styles = StyleSheet.create({

btnClickContain: {
    flex: 1,    
    justifyContent: 'center',
    alignItems: 'center',    
    backgroundColor: '#009D6E',
    zIndex:9,
    position:'absolute',
    bottom:20,
    right:20,
    overflow:'hidden',
    backgroundColor:'#4c8bf5',
    borderRadius:30,
    height:60,
    width:60,    
    elevation:7,
    shadowColor:'#000',
    shadowOpacity:.1,
    shadowOffset:{x : 0, y : 0},    
  },

});