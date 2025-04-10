import ButtonCustom from '@/components/ui/ButtonCustom';
import HeaderCustom from '@/components/ui/HeaderCustom';
import InputCustom from '@/components/ui/InputCustom';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react'
import { useRouter } from 'expo-router';
import Checkbox from 'expo-checkbox';
import { Colors } from "@/constants/Colors";

const Login = () => {
    const router = useRouter();
    const [isChecked, setChecked] = useState(false);

    return(
        <View style={styles.container}>
            <HeaderCustom />
            <Text style={[styles.text, {marginTop:88, marginBottom:48, marginLeft:48}]}>
                로그인
            </Text>
            <InputCustom 
                label="이메일"
                placeholder="이메일을 입력하세요" 
                type="email"  
                isError={false}         
            />
            <InputCustom 
                label="비밀번호"
                placeholder="**********" 
                type="password"  
                isError={false}         
            />
            <View style={[styles.row, styles.optionRow]}>
                <View style={styles.checkboxContainer}>
                    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                    <Text style={styles.middleText}>아이디 저장하기</Text>
                </View>
                <Text style={styles.middleText}>비밀번호를 잊어버리셨습니까?</Text>
            </View>
            <ButtonCustom
                text="로그인"        
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
        color: '#25CCA0',
        fontWeight: '500',
        fontFamily: 'Paperlogy',
        fontSize: 16,
        justifyContent: 'center',
        marginHorizontal: 'auto',
        marginTop: 120,
    },
})

export default Login;