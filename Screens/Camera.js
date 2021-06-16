import React from 'react'
import {Button,Image,View,Platform,StyleSheet, Alert} from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as Permissions from 'expo-permissions'


export default class PicImage extends React.Component{
    state={
        image:null
    }


    getPermissionsAsync=async()=>{
        if(Platform.OS!=="web"){
            const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status!=="granted"){
                Alert.alert("Sorry We Need The Permissions")
            }
        }
    }

    uploadImage=async(uri)=>{
        const data = new FormData()
        var file_name = uri.split("/")[uri.split("/").length-1]
        let type = `image/${uri.split('.')[uri.split('.').length-1]}`
        const file_to_upload={
            uri :uri,
            name:file_name,
            type:type
        }
        data.append("digit",file_to_upload)
        fetch("http://e9d6669a9727.ngrok.io/Predict-digit",{
            method:"POST",
            body:data,
            headers:{"content-type":"multipart/form-data"}
        })
        .then(response=>response.json())
        .then(result=>{
            console.log(result)

        })
        .catch(error=>{
            console.log(error)
        })
    }

    componentDidMount(){
        this.getPermissionsAsync()
    }

    pickImage= async()=>{
        try{
         var result=await ImagePicker.launchImageLibraryAsync({
             mediaTypes:ImagePicker.MediaTypeOptions.All,
             allowsEditing:true,
             aspect:[4,3],
             quality:1

         })
         if(!result.cancelled){
            this.setState({image:result.data})
            this.uploadImage(result.uri)
         }
        }catch(error){
            console.log(error)
        }
    }

    render(){
        return (
            <View style = {styles.container}>
                <Button
                title = "Pick An Image from the gallery"
                onPress={
                    this.pickImage
                }
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  });
  