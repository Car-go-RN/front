import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from "@/constants/Colors";
import MainRestItem from "./MainRestItem";
import ButtonCustom from "./ButtonCustom";
import { useRouter } from "expo-router";
import { getRecommandRestKeyword } from "@/api/RecommendAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SearchDataType } from "./MainHeader";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { getSearchCategory } from "@/api/SearchAPI";

const list = [{id:1},{id:2},{id:3}]

type MainContentProps = {
    isLogin: boolean
}

const MainContents:React.FC<MainContentProps> = ({isLogin}) => {
    const router = useRouter();
    const {location} = useCurrentLocation();
    const userId = useSelector((state:RootState)=>state.user).user?.userId;

    const [recommendItems, setRecommendItems] = useState<SearchDataType[]>([]);

    useEffect(()=>{
        const getRecommandItems = async () => {
            if(!userId)return;
            if(!location){
                return;
            }
            const keywordRes = await getRecommandRestKeyword({userId});
            if(keywordRes.pass){
                const {brands, gases, facilities} = keywordRes.data.preferences;
                const res = await getSearchCategory({
                    brands: brands || [],
                    facilities: facilities || [],
                    gas: gases || [],
                    currentLat: location.coords.latitude, 
                    currentLng: location.coords.longitude
                })
                if(res.pass){
                    setRecommendItems(res.data);
                }
            }

        }
        getRecommandItems();
    },[userId, location])


    return(
        <View style={styles.container}>
        {
            isLogin ? (
                <View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.text, {fontSize:16, fontWeight: 600, marginRight:5}]}>휴게소 추천</Text>
                        <FontAwesome6 name="road" size={20} color={Colors.tint} />
                    </View>
                    <View style={styles.restList}>
                        <ScrollView style={{height: '100%'}} horizontal showsVerticalScrollIndicator={false}>
                            {
                                recommendItems.map((item)=>(
                                    <MainRestItem key={item.id} {...item} />
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
            ) :
            (
                <View style={styles.loginBox}>
                    <Text style={[styles.text,{fontSize:20,color:Colors.tint, fontWeight:600, marginBottom: 30}]}>로그인/회원가입</Text>
                    <Text style={[styles.text,{lineHeight: 25}]}><Text style={{color: Colors.tint}}>설문조사</Text>를 하면{'\n'}나에게 맞는 휴게소를{'\n'}<Text style={{color: Colors.tint}}>더 빠르고 간편하게</Text> 찾을 수 있어요</Text>
                    
                    <View style={styles.buttonContainer}>
                        <ButtonCustom text="로그인 하러가기" onPress={()=>router.push('/auth/Login')}/>
                        <ButtonCustom text="회원가입 하러가기" outline={true} onPress={()=>router.push('/auth/Signup')}/>
                    </View>
                </View>
            )
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '85%',
        margin: 'auto',
        marginTop: 30
    },
    restList: {
        marginTop:15
    },
    loginBox:{
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        height: 350,
        position: 'relative'

    },
    text: {
        fontFamily: 'Paperlogy',
        fontSize: 17
    },
    buttonContainer: {
        width: '125%',
        alignSelf: 'center',
        marginTop: 70,
        gap: 10
    }
});

export default MainContents;