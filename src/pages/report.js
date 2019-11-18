import React , { Component} from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView, TouchableHighlight, Alert, Modal, FlatList, Dimensions,Picker,TextInput   } from 'react-native';
import Searcher from '../components/GoogleAutoComplete';
import  Icon  from 'react-native-ionicons';
import DrawerButton from '../components/DrawerButton';
import Geolocation from "@react-native-community/geolocation";
import api from '../api/request';
import Localization from './localization';
import DatePicker from 'react-native-datepicker'


export default class Pagina extends Component{
    static navigationOptions = {
        drawerLabel: 'Reportar',
        drawerIcon: () => (
            <Icon
                name="create"
                color="#000"
                size={16}                
             />
        ),
    };
    constructor (props) {
        super(props)        
    };

    state={
        type : "1",
        date : null,
        hora: null,
        modalShow: false,  
        descricao :'',            
        location: {
            lat : '',
            lon : '',
        },
    };
    getPosition = async () => {
        Geolocation.getCurrentPosition(
          pos => {            
            this.setState({ location : { lat : pos.coords.latitude, lon :  pos.coords.longitude}});
            console.log(this.state.location);                     
          },                      
          e => setError(this.setState({errorMessage : e.message}))
        );        
      }; 
    checkReport(){
        if(this.state.descricao.length <= 5){
            return "Descrição precisar possuir polomenos 5 caracteres";
        }
        if(this.state.location.lat.length <1 || this.state.location.lon.length <1){
            return "Selecione uma localização";
        }
        if(this.state.date == null){
            return "Selecione uma data";
        }
        if(this.state.hora == null){
            return "Selecione um horario aproximado do ocorrido";
        }
    }  
    report = () =>{
        var valid = this.checkReport();
        if(valid != undefined){
            Alert.alert(valid);
        }
        api.postTheft(this.state.descricao,this.state.date,this.state.hora,this.state.location.lat,this.state.location.lon,this.state.type).then(result =>{
            if(result.data != undefined){
                Alert.alert(result.data);
            }        
        });
        this.clearForm();
    };
    clearForm = () =>{
        this.setState({
            type : "1",
            date : null,
            hora: null,
            modalShow: false,  
            descricao :'',            
            location: {
                lat : '',
                lon : '',
            },
        
        });

    };
    locationDialog = () =>{
        Alert.alert(
            'Utilizar localização ',
            'Endereço : ' ,
                [
                    {text: 'Atual', onPress: () => { this.getPosition(); }},                    
                    {text: 'Procurar', onPress: () => this.setState({ modalShow : true})},  
                ],                    
            );
    };
    locationChanged = (value) =>{
        console.log('recebido');        
        if(value.geometry){                  
             this.setState({ location : {lat : value.geometry.location.lat, lon : value.geometry.location.lng }});             
             console.log(this.state.location);
        }
        else{
            console.log(value);
        }
        this.setState({modalShow : false});
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textHeader} >Nome local</Text>
                <TextInput style={{borderWidth:1,borderColor:'#b5b5b5',borderRadius:3,padding:8,marginVertical:6}} value={this.state.descricao} onChangeText={text =>{this.setState({descricao: text});}} placeholder='Insira o nome do local onde ocorreu' ></TextInput>

                <Text style={styles.textHeader} >Localização</Text>
                <Button title="Selecionar"  color='#00a2cf' onPress={() =>{  this.locationDialog();  }}/>                                 
                <Text style={styles.textSubtitle}>Latitude : {this.state.location.lat} Longitude : {this.state.location.lon}</Text>

                <Text style={styles.textHeader} >Data / Horario</Text>
                <DatePicker
                    style={{width: 'auto',marginVertical:10,}}
                    date={this.state.date}
                    mode="date"
                    placeholder="Selecione a data do ocorrido"
                    format="YYYY-MM-DD"
                    minDate="2017-05-01"
                    maxDate="2020-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                 <DatePicker
                    style={{width: 'auto',marginVertical:5}}
                    date={this.state.hora}
                    mode="time"
                    placeholder="Selecione um horario proximo do ocorrido"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(hora) => {this.setState({hora: hora})}}
                />
            <Text style={styles.textHeader}>Classificação</Text>
            <Picker
                    selectedValue={this.state.type}
                    style={{}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({type: itemValue})
                    }>
                    <Picker.Item label="Assalto" value="1" />
                    <Picker.Item label="Furto" value="2" />                    
            </Picker>
            <View style={styles.buttonViewStyle}>
                <Button title="Reportar"  color='#4c8bf5' onPress={() =>{  this.report();  }}/>                                 
            </View>
            <DrawerButton navigation={this.props.navigation}/>
            <Modal visible={this.state.modalShow} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={{height:Dimensions.get('window').height-240 ,backgroundColor:'#FFF', padding:12,marginTop:'auto',}}>
                       <Localization locationChanged={this.locationChanged}/>
                    </View>
                </View>
            </Modal>
            </View>
        );
    }
};
const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#f2f2f2',
        alignItems:'stretch', 
        justifyContent:'flex-start',
        padding:20,
    },
    modalContainer:{
        flex:1,
        backgroundColor:'rgba(0, 0, 0, 0.7)',
    },
    textHeader:{
        fontSize:20,
        fontWeight:'bold',
        color:'#000',
        marginTop:30,
    },
    textSubtitle:{
        fontSize:12,
        fontWeight:'normal',
        color:'#b5b5b5',
        marginTop:5,        
    },
    buttonViewStyle:{
        marginTop:'auto',
        
    },

});