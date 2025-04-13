import { Colors } from "@/constants/Colors";
import React from "react";
import { TextInput, StyleSheet, Text, View, Pressable } from "react-native";

type InputType = 'email'|'password'|'authNum';

type InputCustomProps = {
    label: string;
    placeholder: string;
    isError?: boolean;
    type: InputType; 
}

const InputCustom:React.FC<InputCustomProps> = ({label, placeholder, isError, type }) => {
    const onPressEmail = () => {
        console.log('email');
    }

    const onPressNumber = () => {
        console.log('num');
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <View style={{flexDirection: 'row'}}>
                <TextInput 
                    style={[styles.input,{borderColor: isError ? Colors.red : undefined, width: type !=='password' ? '70%' : undefined}]}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.placeholder}
                    secureTextEntry={type=='password'? true : false }
                />{
                    type=='password' || (
                        <Pressable style={styles.authButton} onPress={()=>{type=='email' ? onPressEmail() : onPressNumber()}}>
                            <Text style={[styles.text,{margin:0, color:'white', fontSize:13, fontWeight:400}]}>{type=='email' ? '인증번호 발송' : '인증'}</Text>
                        </Pressable>
                    )
                }
            </View>
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
    },
    authButton: {
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: Colors.tint,
        flex: 1,
        marginLeft: 5,
        borderRadius: 5
    }
})

export default InputCustom;