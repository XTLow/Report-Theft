import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar,TextInput, Alert, Button,TouchableHighlight  } from 'react-native';
import React,{ Component } from 'react';
import DrawerButton from '../components/DrawerButton';
import  Icon  from 'react-native-ionicons';
import api from '../api/request';

export default class Home extends Component{
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => (
            <Icon
                name="home"
                color="#000"
                size={16}                
             />
        ),
    };   
    componentDidMount(){
        this.getUpdateCount();
    } 
    state={
        count : 0
    }
    getUpdateCount = () =>{
        api.getCountReportToday().then(response => { 
            if(response.data.count) {
                this.setState({count : response.data.count});
            }
            else{
                this.setState({count : 0});
            }
        });
        console.log('sended');        
    }
    render(){
        return( 
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.textHeaderStyle}>Bem vindo ao reportador</Text>
                    <Text style={styles.textStyle}>Abra o menu mais a esquerda para começar</Text>
                </View>
                <View style={{marginTop:200,}}>
                    <Text style={styles.textStyle}>Numero de denuncias realizadas hoje</Text>
                    <Text style={styles.textCountStyle}>{this.state.count}</Text>
                    <TouchableHighlight onPress={() => {this.getUpdateCount();}} style={styles.btnClickContain} underlayColor='#4cb7f5'>                    
                        <Icon name="refresh"
                        color="#fff"                
                        size={40}
                        />                    
                 </TouchableHighlight>  
                </View>
                <DrawerButton navigation={this.props.navigation}/>
            </SafeAreaView>
        );
    }    
}

const styles = StyleSheet.create({
    container:{
        flex:1,        
        justifyContent:"center",
        alignItems:"center",        
    },
    textHeaderStyle:{
        fontSize:20,
        alignSelf:'center',
        fontWeight:"bold"
    },
    textStyle:{
        fontSize:14,
        alignSelf:'center',
        fontWeight:'normal'
    },
    textInputStyle:{
        marginTop:10,    
        alignSelf: 'stretch',
        marginHorizontal:20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6d7da',
    },
    textCountStyle:{
        fontSize:30,
        fontWeight:'bold',
        color:'#404040',
        textAlign:"center",
        alignSelf:"center",
    },
    btnClickContain: {     
        alignSelf:"center",   
        justifyContent: 'center',
        alignItems: 'center',    
        backgroundColor: '#009D6E',        
        overflow:'hidden',
        backgroundColor:'#4c8bf5',
        borderRadius:30,
        marginTop:30,
        height:60,
        width:60,    
        elevation:7,
        shadowColor:'#000',
        shadowOpacity:.1,
        shadowOffset:{x : 0, y : 0},    
      },
});
