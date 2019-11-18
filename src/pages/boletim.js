import React , { Component} from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView, TouchableHighlight, Alert, Modal, FlatList, Dimensions  } from 'react-native';
import  Icon  from 'react-native-ionicons';
import DrawerButton from '../components/DrawerButton';
import { WebView } from 'react-native-webview';

export default class Boletim extends Component{
    static navigationOptions = {
        drawerLabel: 'Boletim',
        drawerIcon: () => (
            <Icon     
                name="paper"           
                color="#000"
                size={16}                
             />
        ),
    };    
    render(){
        return (
            <WebView
            source={{ uri: 'https://www.delegaciaeletronica.policiacivil.sp.gov.br/ssp-de-cidadao/pages/comunicar-ocorrencia' }}
            style={{ marginTop: 20 }}
          />
        );
    }
}