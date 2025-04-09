import ButtonCustom from '@/components/ui/ButtonCustom';
import { View, Text, StyleSheet } from 'react-native';

const Login = () => {
    return(
        <View style={styles.container}>
            <Text style={[styles.text, {marginTop:100, marginLeft:48}]}>
                로그인
            </Text>
            <ButtonCustom
                text="설문조사 변경하기"            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontWeight: 'bold',
        fontFamily: 'Paperlogy',
        fontSize: 24,
    }
})

export default Login;