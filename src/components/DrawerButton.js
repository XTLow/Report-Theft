import React from 'react';
import { StyleSheet } from 'react-native';
import  Icon  from 'react-native-ionicons';

export default class DrawerButton extends React.Component{
    render(){
        return(
            <Icon
                name="menu"
                color="#000"
                size={30}
                style={styles.menuIcon}
                onPress={() =>this.props.navigation.toggleDrawer()}
            />
        );
    }
}

const styles = StyleSheet.create({
    menuIcon:{
        zIndex:9,
        position:'absolute',
        top:10,
        left:20,        
    }
})