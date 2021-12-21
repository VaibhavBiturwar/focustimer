import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Spacing} from '../utils/sizes';

export const RoundedButton = ({
    style = {},
    textStyle ={},
    size = 125,
    ...props
}) =>{

    return(
        <TouchableOpacity style={[ styles(size).radius, style]} onPress={props.onPress} >
        <Text style={[ styles(size).titleTextStyle, textStyle ]}  >{props.title}</Text>
        </TouchableOpacity>

    );

}


const styles = (size) =>StyleSheet.create({

    
    titleTextStyle:{
       color: '#fff', fontSize: size / 3 
    },

    radius: {
       borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: "center",
      borderColor: "#fff",
      borderWidth: 2
    },


});


