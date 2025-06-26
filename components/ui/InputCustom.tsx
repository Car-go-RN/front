import { Colors } from "@/constants/Colors";
import React from "react";
import { TextInput, StyleSheet, Text, View, Pressable } from "react-native";

type InputType = 'email'|'signupEmail'|'password'|'authNum'|'text';

type InputCustomProps = {
    label: string;
    placeholder: string;
    isError?: boolean;
    isSignup?: boolean;
    type: InputType;
    onChangeText?: (text:string) => void; 
    onPress?: () => void;
}

const InputCustom:React.FC<InputCustomProps> = ({label, placeholder, isError, isSignup, type, onChangeText, onPress }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <View style={{flexDirection: 'row'}}>
                <TextInput 
                    style={[styles.input,{borderColor: isError ? Colors.red : Colors.lightGrey, width: isSignup ? '70%' : '100%'}]}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.placeholder}
                    secureTextEntry={type=='password'? true : false }
                    onChangeText={onChangeText}
                />{
                    isSignup && (
                        <Pressable style={styles.authButton} onPress={onPress}>
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