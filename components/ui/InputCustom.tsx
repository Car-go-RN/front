import { Colors } from "@/constants/Colors";
import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

type InputType = 'email'|'password'|'authNum';

type InputCustomProps = {
    label: string;
    placeholder: string;
    isError?: boolean;
    type: InputType; 
}

const InputCustom:React.FC<InputCustomProps> = ({label, placeholder, isError, type }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <TextInput 
                style={[styles.input,{borderColor: isError ? Colors.red : undefined}]}
                placeholder={placeholder}
                placeholderTextColor={Colors.placeholder}
                secureTextEntry={type=='password'? true : false }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'80%',
        marginHorizontal:'auto',
        marginBottom: 13,
    },
    input:{
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        borderStyle: 'solid',
        borderRadius: 5,
        fontSize: 15,
        fontFamily:'Paperlogy',
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    text:{
        fontFamily:'Paperlogy',
        fontSize: 16,
        marginBottom: 6,
        marginLeft:5
    }
})

export default InputCustom;