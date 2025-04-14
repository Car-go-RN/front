import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import MainHeader from "@/components/ui/MainHeader";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from "@/constants/Colors";
import MainContents from "@/components/ui/MainContents";
import { useRouter } from "expo-router";

const Main = () => {
    const router = useRouter();
    return(
        <View>
            <MainHeader />
            <View style={styles.goRoutePage}>
                <Pressable onPress={() => router.push('/search/routeQuest')}>
                    <Image source={require('@/assets/images/rest-area.png')} style={styles.backgroundImage}/>
                    <View style={styles.goRouteDetail}>
                        <FontAwesome5 name="pen" size={27} color={Colors.tint} />
                        <View>
                            <Text style={[styles.text,{fontSize: 12, fontWeight: 400, color:'#767676'}]}>지금 바로 휴게소를 알고 싶다면?</Text>
                            <Text style={[styles.text,{fontSize: 16, fontWeight:600, marginVertical: 5}]}>내 경로에 있는 휴게소 보기</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
            <MainContents isLogin={false}/>
        </View>
    )

}

const styles = StyleSheet.create({
    goRoutePage: {
        marginTop: 30,
        position:'relative'
    },
    backgroundImage: {
        width:'85%',
        height: 100,
        margin:'auto',
        borderRadius: 5,
    },
    goRouteDetail: {
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        width: '85%',
        height: 100,
        position:'absolute',
        backgroundColor: 'white',
        opacity: 0.7,
        alignSelf:'center',
        justifyContent:'center'
    },
    text:{
        fontFamily:'Paperlogy',
        marginLeft: 15
    }
});

export default Main;