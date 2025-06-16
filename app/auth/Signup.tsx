import ButtonCustom from "@/components/ui/ButtonCustom";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { View, Text, Pressable, StyleSheet } from "react-native"

import { Colors } from "@/constants/Colors";
import InputCustom from "@/components/ui/InputCustom";
import { useReducer, useState } from "react";
import { useRouter } from "expo-router";
import { codeVerification, emailVerification, postSignup } from "@/api/AuthAPI";

type FormState = {
    email: string,
    authNum: string,
    password: string,
    repassword: string
}

type Action = 
    | {type:'CHANGE_INPUT'; name: keyof FormState; value: string}
    | {type:'RESET'};


const initialForm:FormState = {
    email: '',
    authNum: '',
    password: '',
    repassword: ''
}

const formReducer = (state:FormState, action: Action) : FormState => {
    switch(action.type){
        case 'CHANGE_INPUT':
            console.log(state);
            return {
                ...state,
                [action.name]: action.value
            }
        case 'RESET':
            return initialForm;
        default:
            return state
    }
}

const Signup = () => {
    const router = useRouter();
    const [form, dispatch] = useReducer(formReducer, initialForm);
    const [emailCheck, setEmailCheck] = useState(false);

    const handlePostData = async () => {
        //회원가입 api 로직
        if(emailCheck){
            alert('이메일을 인증해주세요');
            return;
        }
        if(form.password !== form.repassword){
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다');
            return;
        }
        
        const res = await postSignup({email: form.email, password:form.password});
        if(res.pass){
            dispatch({type:'RESET'})
            router.push('/auth/Login');
        }
    }

    const emailVerify = async () => {
        const res = await emailVerification({email:form.email});
        if(res.pass){
            alert("이메일을 확인해주세요");
        }
    }

    const emailCodeVerify = async () => {
        const res = await codeVerification({email: form.email, code:form.authNum})
        if(res.pass){
            alert("인증되었습니다");
            setEmailCheck(true);
        }
    }

    return(
        <View style={styles.container}>
            <HeaderCustom />
            <Text style={[styles.text, {marginTop:100, marginLeft:48}]}>
                회원가입
            </Text>
            <View style={styles.inputContainer}>
                <InputCustom 
                    label="이메일"
                    placeholder="이메일을 입력하세요."
                    type="email"
                    isSignup={true}
                    onChangeText={(text)=>dispatch({type:'CHANGE_INPUT', name:'email', value:text})}
                    onPress={emailVerify}
                />
                <InputCustom 
                    label="인증번호"
                    placeholder="C2J3D2"
                    type="authNum"
                    isSignup={true}
                    onChangeText={(text)=>dispatch({type:'CHANGE_INPUT', name:'authNum', value:text})}
                    onPress={emailCodeVerify}
                />
                <InputCustom 
                    label="비밀번호"
                    placeholder="*********"
                    type="password"
                    onChangeText={(text)=>dispatch({type:'CHANGE_INPUT', name:'password', value:text})}
                />
                <InputCustom 
                    label="비밀번호 확인"
                    placeholder="*********"
                    type="password"
                    onChangeText={(text)=>dispatch({type:'CHANGE_INPUT', name:'repassword', value:text})}
                />
            </View>
            
            <ButtonCustom
                text="회원가입"   
                onPress={()=>handlePostData()}         
            />
            <Pressable onPress={()=>router.push('/auth/Login')}>
                <Text style={styles.checkUser}>이미 회원이신가요</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    text: {
        fontWeight: 'bold',
        fontFamily: 'Paperlogy',
        fontSize: 25,
    },
    inputContainer:{
        marginVertical: 25
    },
    checkUser: {
        color: '#25CCA0',
        fontWeight: '500',
        fontFamily: 'Paperlogy',
        fontSize: 16,
        justifyContent: 'center',
        marginHorizontal: 'auto',
        marginTop: 70,
    }
})

export default Signup;