import { getRestInfo } from "@/api/RestAreaAPI";
import HeaderCustom from "@/components/ui/HeaderCustom";
import RestDetail from "@/components/ui/RestDetail";
import RestReview from "@/components/ui/RestReview";
import RestWriteReview from "@/components/ui/RestWriteReview";
import { Colors } from "@/constants/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, GestureResponderEvent, Alert } from "react-native"

export type RestInfo = {
    id: number,
    stdRestNm: string,//화면에 표시되는 이름
    restAreaNm: string, //파라미터로 보낼 이름
    gasolinePrice:string,
    diselPrice: string,
    lpgPrice:string,
    electric: string,
    hydrogen: string,
    roadAddress: string,
    phone:string,
    latitude: number,
    longitude:number,
    brands: string[],
    facilities: string[],
    foods: Record<string, string>[]
}

type navType = 'detail'|'review'|'write';

const RestArea = () => {
    const {stdRestNm} = useLocalSearchParams();
    const [nav, setNav] = useState<navType>('detail');
    const [data, setData] = useState<RestInfo>()

    useEffect(()=>{
        const getInfo = async () => {
            const res = await getRestInfo({stdRestNm: stdRestNm as string});
            if(res.pass){
                setData(res.data);
            }
            else {
                Alert.alert('휴게소 정보 불러오기 실패', '데이터를 불러오지 못했습니다');
            }
        }
        getInfo();
    },[])

    if(!data){
        return;
    }

    return(
        <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <HeaderCustom />
                    </View>
                    <Image style={styles.restImg} source={require('@/assets/images/test-rest-area.png')}/>
                    <View style={[container.all,container.title,{paddingVertical: 35}]}>
                        <Text style={[styles.text,{fontSize: 24, fontWeight:700}]}>{data.stdRestNm}</Text>
                        <View style={styles.reaction}>
                            <AntDesign name="heart" size={17} color={Colors.lightGrey} style={styles.icon} /><Text style={styles.reactState}>12</Text>
                            <Ionicons name="bookmark" size={17} color={Colors.lightGrey} style={styles.icon} />
                        </View>
                    </View>
                    <View style={[container.all,container.title]}>
                        <Text style={[styles.text,{color:Colors.yellow, fontSize: 16}]}>★★★★☆ 3.0</Text>
                        <Text style={[styles.text,{color:Colors.tint, fontSize: 14, alignSelf:'center'}]}>휴게소까지 거리 28km</Text>
                    </View>
                    <View style={container.nav}>
                        <View style={[container.all,{flexDirection:'row', paddingVertical: 15}]}>
                            <Pressable onPress={()=>setNav('detail')} style={{marginRight: 25}}>
                                <Text 
                                    style={[styles.text, styles.nav, nav=='detail' ? styles.activeNav : undefined]}>상세정보
                                </Text>
                            </Pressable>
                            <Pressable onPress={()=>{console.log('asdf');setNav('review')}}>
                                <Text 
                                    style={[styles.text,styles.nav, nav!=='detail' ? styles.activeNav : undefined]}>리뷰
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    
                        <View style={[container.all, {flex: 1}]}>
                        {
                            nav=='detail' ? (
                                <RestDetail data={data} />
                            ) : nav=='review' ?  (
                                <RestReview restId={data.id} />
                            ) : (
                                <RestWriteReview setNav={setNav} />
                            )
                        }
                        </View>
                        
                        {
                            nav!=='write' && (
                                <View style={container.writeButton}>
                                    <Pressable onPress={()=>{console.log('press');setNav('write')}}><Ionicons name="chatbox-ellipses" size={30} color="white" /></Pressable>
                                </View>
                            )
                        }
                        
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        width: '100%',
        zIndex: 1
    },
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        zIndex: 0
    },
    restImg: {
        width: '100%',
        height: 250
    },
    reaction: {
        flexDirection: 'row',
        marginLeft:10
    },
    icon: {
        marginRight: 3
    },
    reactState: {
        color: Colors.lightGrey,
        width: 25,
        fontSize: 15
    },
    text: {
        fontFamily: 'Paperlogy'
    },
    nav:{
        fontSize: 14,
        color: Colors.placeholder
    },
    activeNav:{
        color: Colors.tint,
        textDecorationColor: Colors.tint,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'                                                                     
    }
});

const container = StyleSheet.create({
    all: {
        width: '80%',
        alignSelf: 'center',
    },
    title:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nav: {
        marginVertical: 15,
        borderColor: Colors.lightGrey,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    writeButton:{
        position: 'absolute',
        bottom: 40,
        right: 30,
        backgroundColor: Colors.tint,
        width: 60, 
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})

export default RestArea;