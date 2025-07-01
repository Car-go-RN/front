import React, { useReducer, useState, useEffect } from 'react'
import ButtonCustom from '@/components/ui/ButtonCustom';
import HeaderCustom from '@/components/ui/HeaderCustom';
import InputCustom from '@/components/ui/InputCustom';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Checkbox from 'expo-checkbox';
import { Colors } from "@/constants/Colors";
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux'
import { loginSuccess } from '@/store/slices/userSlices';
import { postLogin } from '@/api/AuthAPI';

type LoginState = {
    email: string;
    password: string;
}

type Action =
    | { type: 'CHANGE_INPUT'; name: keyof LoginState; value: string }
    | { type: 'RESET'};

const initialForm: LoginState = {
    email: '',
    password: '',
}

const formReducer = (state: LoginState, action: Action): LoginState => {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                [action.name]: action.value,
            };
        case 'RESET':
            return initialForm;
        default:
            return state;
    }
};

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [form, formDispatch] = useReducer(formReducer, initialForm);
    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        const loadSavedEmail = async () => {
            const savedEmail = await SecureStore.getItemAsync('savedEmail');
            if (savedEmail) {
                formDispatch({ type: 'CHANGE_INPUT', name: 'email', value: savedEmail });
                setChecked(true);
            }
        };
        loadSavedEmail();
    }, [])

    const handleLogin = async () => {

        const res = await postLogin({
            email: form.email,
            password: form.password,
        });

        if (res.pass) {
            const token = res.data.token; 
            const user = {
                email: form.email,
                userId: res.data.userId,
            }
            //Redux에 저장
            // dispatch(loginSuccess({ token, user: {email: form.email, userId: user.userId } }));
            dispatch(loginSuccess({ token, user }));
            //SecureStore에 저장
            await SecureStore.setItemAsync('accessToken', token);
            await SecureStore.setItemAsync('user', JSON.stringify(user));

            if (isChecked) {
                await SecureStore.setItemAsync('savedEmail', form.email);
            } else {
                await SecureStore.deleteItemAsync('savedEmail');
            }

            router.push('/');
        } else {
            const errorMessage = res.data?.response?.data?.message || "로그인 실패";
            alert(errorMessage);
        }
    }

    return(
        <View style={styles.container}>
            <HeaderCustom />
            <Text style={[styles.text, {marginTop:88, marginBottom:48, marginLeft:44}]}>
            로그인
            </Text>
            <InputCustom 
                label="이메일"
                placeholder="이메일을 입력하세요" 
                type="email"  
                isError={false}
                value={form.email}     
                onChangeText={(text) => formDispatch({ type: 'CHANGE_INPUT', name: 'email', value: text })}    
            />
            <InputCustom 
                label="비밀번호"
                placeholder="**********" 
                type="password"  
                isError={false}   
                value={form.password}
                onChangeText={(text) => formDispatch({ type: 'CHANGE_INPUT', name: 'password', value: text })}      
            />
            <View style={[styles.row, styles.optionRow]}>
                <View style={styles.checkboxContainer}>
                    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                    <Text style={styles.middleText}>아이디 저장하기</Text>
                </View>
            </View> 
            <ButtonCustom
                text="로그인"   
                onPress={handleLogin}     
            />
            <Pressable onPress={() => router.push('/auth/Signup')}>
                <Text style={styles.checkUser}>
                    아직 회원이 아니신가요?
                </Text>
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
        width: '80%',
        fontWeight: 'bold',
        fontFamily: 'Paperlogy',
        fontSize: 24,
    },
    middleText: {
        fontFamily: 'Paperlogy',
        fontSize: 13,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32,
        marginTop: 12,
        marginHorizontal: 'auto',
        width: '80%', 
    },     
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 8,
    },
    checkUser: {
        color: Colors.tint,
        fontWeight: '500',
        fontFamily: 'Paperlogy',
        fontSize: 16,
        justifyContent: 'center',
        marginHorizontal: 'auto',
        marginTop: 120,
    },
})

export default Login;
