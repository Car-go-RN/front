import { getRestFavoriteIds, getRestImg, getRestInfo, getRestLikeIds, getRestLikesCount, getremainingDistance, postMyFavorite, postMyLikes } from "@/api/RestAreaAPI";
import HeaderCustom from "@/components/ui/HeaderCustom";
import RestDetail from "@/components/ui/RestDetail";
import RestReview from "@/components/ui/RestReview";
import RestWriteReview from "@/components/ui/RestWriteReview";
import { Colors } from "@/constants/Colors";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Alert } from "react-native"
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export type RestInfo = {
    id: number,
    reviewAVG: number,
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

type reactionType = {
    like: boolean;
    likeCount: number|null;
    favorite :boolean;
}

const initialReaction:reactionType = {
    like: false,
    likeCount: null,
    favorite: false
}

const RestArea = () => {
    const router = useRouter();
    const {stdRestNm} = useLocalSearchParams();
    const userId = useSelector((state:RootState)=>state.user).user?.userId;

    const [nav, setNav] = useState<navType>('detail');
    const [data, setData] = useState<RestInfo>()
    const [distance, setDistance] = useState<number|null>(null)
    const [imgUrl, setImgUrl] = useState<string>('');
    const [reaction, setReaction] = useState<reactionType>(initialReaction);

    const {location} = useCurrentLocation();

    useEffect(()=>{
        if(!location)return;
        const getInfo = async () => {
            console.log(stdRestNm);
            const res = await getRestInfo({stdRestNm: stdRestNm as string, latitude: location.coords.latitude, longitude: location.coords.longitude});
            if(res.pass){
                setData(res.data);
                console.log(res.data);
            }
            else {
                console.log(res.data);
                Alert.alert('휴게소 정보 불러오기 실패', '데이터를 불러오지 못했습니다');
                router.push('/');
                return;
            }
        }
        getInfo();
    },[location])

    useEffect(()=>{
        if(!data)return;
        const getIsFavorite = async () => {
            if(!userId)return;
            const res = await getRestFavoriteIds({userId});
            if(res.pass){
                if(res.data.some((item:Record<string, number>)=> item.restAreaId===data.id)){
                    setReaction((prev)=>({...prev, favorite: true}));
                }
            }
        }
        const getIsLike = async () => {
            if(!userId)return;
            const res = await getRestLikeIds({userId});
            if(res.pass){
                if(res.data.some((item:Record<string, number>)=> item.restAreaId===data.id)){
                    setReaction((prev)=>({...prev, like: true}));
                }
            }
        }
        getIsFavorite();
        getIsLike();
    },[data])

    useEffect(()=>{
        if(!data)return;
        const getRestImgUrl = async () => {
        const res = await getRestImg({restName: data.restAreaNm})
        if(res.pass){
            setImgUrl(res.data);
        }
        }
        getRestImgUrl();
    },[data])

    useEffect(()=>{
        if(!location || !data){
            return;
        }
        const {latitude, longitude} = location.coords
        const getDistance = async () => {
            const res = await getremainingDistance({latitude:latitude, longitude:longitude, stdRestNm: data.stdRestNm});
            if(res.pass){
                setDistance(res.data.distanceKm);
                console.log(res.data);
            }
            else {
                setDistance(null)
            }
        }
        getDistance();
    },[location])

    const onPressReaction = async (key:string) => {
        if(!data || !userId)return;
        if(key==='like'){
            const res = await postMyLikes({restAreaId:data.id, userId });
            if(res.pass){
                setReaction((prev)=>({...prev, like: !prev.like}));

                const countRes = await getRestLikesCount({ restAreaId: data.id });
                if (countRes.pass) {
                    console.log(countRes.data)
                    setReaction((prev) => ({ ...prev, likeCount: countRes.data }));
                }
                else {
                    console.log(countRes.data);
                }
            }
        }
        else if(key==='favorite'){
            const res = await postMyFavorite({restAreaId:data.id, userId });
            if(res.pass){
                setReaction((prev)=>({...prev, favorite: !prev.favorite}));
            }
        }
    }

    if(!data || !distance || !imgUrl){
        console.log('으웹', data, distance, imgUrl);
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
                    <Image style={styles.restImg} source={{uri:imgUrl}} width={500}/>
                    <View style={[container.all,container.title,{paddingVertical: 35}]}>
                        <Text style={[styles.text,{fontSize: 24, fontWeight:700}]}>{data.stdRestNm}</Text>
                        <View style={styles.reaction}>
                            <Pressable onPress={()=>onPressReaction('like')}>
                                <AntDesign name="heart" size={17} color={reaction.like ? Colors.red : Colors.lightGrey} style={styles.icon} />
                            </Pressable>
                            <Text style={styles.reactState}>{reaction.likeCount || 0}</Text>
                            <Pressable onPress={()=>onPressReaction('favorite')}>
                                <Ionicons name="bookmark" size={17} color={reaction.favorite ? Colors.yellow : Colors.lightGrey} style={styles.icon} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={[container.all,container.title]}>
                        <Text style={[styles.text,{color:Colors.yellow, fontSize: 16}]}>
                            {
                                Array.from({length: 5}, (_, i)=> i + 1).map((i) => {
                                    if(i<=Math.round(data.reviewAVG))return '★' 
                                    else return '☆'
                                })
                            }
                            <Text style={[styles.text,{color:Colors.yellow, marginLeft:5}]}>{data.reviewAVG}</Text>
                        </Text>
                        <Text style={[styles.text,{color:Colors.tint, fontSize: 14, alignSelf:'center'}]}>휴게소까지 거리 {distance || '오류'}km</Text>
                    </View>
                    <View style={container.nav}>
                        <View style={[container.all,{flexDirection:'row', paddingVertical: 15}]}>
                            <Pressable onPress={()=>setNav('detail')} style={{marginRight: 25}}>
                                <Text 
                                    style={[styles.text, styles.nav, nav=='detail' ? styles.activeNav : undefined]}>상세정보
                                </Text>
                            </Pressable>
                            <Pressable onPress={()=>{setNav('review')}}>
                                <Text 
                                    style={[styles.text,styles.nav, nav!=='detail' ? styles.activeNav : undefined]}>리뷰
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    
                        <ScrollView 
                            style={[container.all, {flex: 1}]}
                            keyboardShouldPersistTaps="handled"
                        >
                        {
                            nav=='detail' ? (
                                <RestDetail data={data} />
                            ) : nav=='review' ?  (
                                <RestReview restId={data.id} />
                            ) : (
                                <RestWriteReview setNav={setNav} restAreaName={data.restAreaNm}/>
                            )
                        }
                        </ScrollView>
                        
                        {
                            nav!=='write' && (
                                <View style={container.writeButton}>
                                    <Pressable onPress={()=>{setNav('write')}}><Ionicons name="chatbox-ellipses" size={30} color="white" /></Pressable>
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