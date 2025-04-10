import ButtonCustom from "@/components/ui/ButtonCustom";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { View, Text, Pressable, StyleSheet } from "react-native"

import { Colors } from "@/constants/Colors";
import InputCustom from "@/components/ui/InputCustom";

const Signup = () => {
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
                    isError={true}
                />
                <InputCustom 
                    label="인증번호"
                    placeholder="C2J3D2"
                    type="authNum"
                />
                <InputCustom 
                    label="비밀번호"
                    placeholder="*********"
                    type="password"
                />
                <InputCustom 
                    label="비밀번호 확인"
                    placeholder="*********"
                    type="password"
                />
            </View>
            
            <ButtonCustom
                text="회원가입"            
            />
            <Pressable>
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