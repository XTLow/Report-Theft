import React, { Component } from 'react';
import { Plataform, Dimensions } from 'react-native';
import { createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import pgHome from './pages/home';
import pgSearch from './pages/view';
import pgBoletim from './pages/boletim';
import pgReport from './pages/report';

const _width = Dimensions.get('window').width;
const _drawerConfig = { drawerWidth:_width *0.75,  headerMode: 'screen',}
const _drawerNavigator = createDrawerNavigator(
    {
        Home:{
            name:'Inicio',
            screen : pgHome,
        },
        Search:{
            name:'Pesquisar',
            screen : pgSearch,
        },
        Report:{
            name:'Reportar',
            screen : pgReport,
        },
        Boletim:{
            name:'Boletim',
            screen : pgBoletim,
        },

    },    
    _drawerConfig
    );

export default createAppContainer(_drawerNavigator);