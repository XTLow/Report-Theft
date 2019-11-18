import React , { Component} from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView, TouchableHighlight, Alert, Modal, FlatList, Dimensions  } from 'react-native';
import Searcher from '../components/GoogleAutoComplete';
import  Icon  from 'react-native-ionicons';
import DrawerButton from '../components/DrawerButton';
import Geolocation from "@react-native-community/geolocation";
import api from '../api/request';
import Localization from './localization';

export default class Pagina extends Component{
    static navigationOptions = {
        drawerLabel: 'Pesquisar',
        drawerIcon: () => (
            <Icon
                name="search"
                color="#000"
                size={16}                
             />
        ),
    };
    state={
        modalShow: false,
        modal2Show: false,
        count1 : 0,
        count2 : 0,
        data :[],
        location: {
            lat : '',
            lon : '',
        },
    }
    renderItem = ({item}) => {
        return(            
            <View style={styles.theftItem}>            
                <Text style={styles.theftItemHeaderTextContent}>{item.DESCRICAO}</Text>                        
                <Text style={styles.theftItemTextContent}>Tipo : {item.TYPE_ID}</Text>
                <Text style={styles.theftItemTextContent}>Data : {item.DATA}</Text>
                <Text style={styles.theftItemTextContent}>Hora : {item.HORA}</Text>            
            </View>
        );
    }
    showLocationOption = () =>{
        Alert.alert(
            'Utilizar localização ?',
            'Endereço : ' ,
                [
                    {text: 'Atual', onPress: () => { this.setState({ modalShow : true}); this.getPosition(); }},                    
                    {text: 'Procurar', onPress: () => this.setState({ modal2Show : true})},  
                ],                    
            );
    }
    mapCount = () =>{
        for (let index = 0; index < this.state.data.length; index++) {            
            if(this.state.data[index].TYPE_ID == 1){
                this.state.count1++;                              
            }
            else{
                this.state.count2++;                
            }
        }
    }    
    getList = () =>{
        api.getTheftFromRange(100,'2010-10-25',this.state.location.lat,this.state.location.lon).then(response => { this.setState({data : response.data}); this.mapCount();  });
    }
    getPosition = async () => {
        Geolocation.getCurrentPosition(
          pos => {            
            this.setState({ location : { lat : pos.coords.latitude, lon :  pos.coords.longitude}});
            console.log(this.state.location);
            this.getList();            
          },                      
          e => setError(this.setState({errorMessage : e.message}))
        );        
      };   
    locationChanged = (value) =>{
        console.log('recebido');        
        if(value.geometry){                  
             this.setState({ location : {lat : value.geometry.location.lat, lon : value.geometry.location.lng }});
             this.getList();
             console.log(this.state.location);
        }
        else{
            console.log(value);
        }
        this.setState({modal2Show : false});
    }
    render(){
        return(
            <View style={styles.container}>
            <DrawerButton navigation={this.props.navigation}/>
            <View style={styles.cardStyle} >
             
                <View style={styles.cardSectionX}>
                    <Text style={styles.textStyle}> Assaltos </Text>
                    <FlatList data={this.state.data} renderItem={this.renderItem}  ></FlatList>
                </View>

                <View style={styles.cardSection }>
                    <Text style={styles.textStyle}>Numero de assaltos : </Text>
                    <Text style={styles.textStyle2}>{this.state.count1}</Text>
                </View>
                <View style={styles.cardSection }>
                    <Text style={styles.textStyle}>Numero de furtos : </Text>
                    <Text style={styles.textStyle2}>{this.state.count2}</Text>
                </View>
            </View>


            <View style={styles.rowView}>                  
                <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>          
                    <Button title="Localização"  color='#ffd000' onPress={() =>{  this.showLocationOption();  }}/>                                 
                </View>
            </View>
            <Modal visible={this.state.modalShow} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text>MyModal</Text>
                        <Button title="Sair" onPress={() => {this.setState({ modalShow : false})}}/>
                    </View>
                </View>
            </Modal>
            <Modal visible={this.state.modal2Show} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={{height:Dimensions.get('window').height-240 ,backgroundColor:'#FFF', padding:12,marginTop:'auto',}}>
                       <Localization locationChanged={this.locationChanged}/>
                    </View>
                </View>
            </Modal>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    
container:{
    flex:1,
    backgroundColor:'#f2f2f2',
    alignItems:'stretch', 
    justifyContent:'center',
},
modalView:{
    height:'auto',
    marginTop:'auto',
    padding:12,
    backgroundColor:'#fff',
},
modal2View:{            
    padding:12,
    backgroundColor:'#fff',
},
modalContainer:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.7)',
},
cardStyle:{
    backgroundColor:'#fff',
    borderRadius:8,
    marginHorizontal:20,
    marginTop:50,    
    elevation:5,
    shadowColor:'#000',
    shadowOpacity:.1,
    shadowOffset:{x : 0, y : 0},
    flex:1,    
    paddingVertical:10,
},
cardSection:{
    marginHorizontal:10,
    marginVertical:5,
    borderRadius:6,
    backgroundColor:'#FFF',
    elevation:5,
    shadowColor:'#000',
    shadowOpacity:.1,
    shadowOffset:{x : 0, y : 0},
    padding:12,            
},
cardSectionX:{
    marginHorizontal:10,
    marginVertical:5,
    borderRadius:6,
    backgroundColor:'#FFF',
    elevation:5,
    shadowColor:'#000',
    shadowOpacity:.1,
    shadowOffset:{x : 0, y : 0},
    padding:12,  
    flex:1,          
},
rowView:{       
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'auto',  
    marginBottom:10,   

},
textStyle:{
    fontSize:20,
    fontWeight:'bold',
    color:'#000',
},
textStyle2:{
    fontSize:16,
    fontWeight:'normal',
    color:'#000',
},
theftItem:{
    flex:1,
    flexDirection:'column',    
    borderBottomWidth:1,
    borderColor:'#adadad',
    marginVertical:5,
},
theftItemHeaderTextContent:{
    fontSize:17,
    fontWeight:'bold',
    color:'#000',
},
theftItemTextContent:{
    fontSize:16,
    fontWeight:'normal',
    color:'#6e6e6e',
},


});