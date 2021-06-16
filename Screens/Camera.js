import React from 'react'
import {Button,Image,View,Platform} from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as Permissions from 'expo-Permissions'

export default class PicImage extends React.Component{
    state={
        image:null
    }

    render(){
        return (
            <View style = {{flex:1,justifyContent:'center',alignItems:"center"}}>
                <Button/>
            </View>
        )
    }
}