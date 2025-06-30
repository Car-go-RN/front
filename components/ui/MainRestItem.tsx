import { Colors } from "@/constants/Colors"
import { GestureResponderEvent, Image, Pressable, StyleSheet, Text, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import TagCustom from "./TagCustom";
import { brandImg } from "@/constants/BrandImg";
import { amenities } from "@/constants/TagMock";
import { SearchDataType } from "./MainHeader";
import { getRestImg, postMyFavorite } from "@/api/RestAreaAPI";
import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AmenitiesIcon } from "@/constants/AmenitiesIcon";

type RecommendDataType = {
    onPress?: (event: GestureResponderEvent) => void;
    id:number,
    stdRestNm:string
    reviewAVG: number,
    gasolinePrice: string,
    diselPrice: string,
    lpgPrice:string,
    electric:string,
    hydrogen: string,
    roadAddress: string,
    phone: string,
    latitude: number,
    longitude: number,
    restAreaNm: string,
    distance: number|null,
    brands: string[];
    facilities: string[],
    foods: {foodNm:string, foodCost:string}[]
};

const MainRestItem = (props:RecommendDataType) => {
    const router = useRouter()
    const userId = useSelector((state:RootState) => state.user).user?.userId;
    const [marked, setMarked] = useState(false);
    const [imgUrl, setImgUrl] = useState<string>('');

    useEffect(()=>{
        const getRestImgUrl = async () => {
        const res = await getRestImg({restName: props.restAreaNm})
        if(res.pass){
            setImgUrl(res.data);
        }
        }
        getRestImgUrl();
    },[])

    const handleMark = async () => {
        const res = await postMyFavorite({restAreaId:props.id, userId: userId as number})
        if(res.pass){
        //useState로 관리하는 거 수정 필요 ( api 연결해서 휴게소 즐겨찾기 값에 따라 나오게)
        setMarked(true)
        }
    }
    const handleDownMark = async () => {
        const res = await postMyFavorite({restAreaId:props.id, userId: userId as number})
        if(res.pass){
        setMarked(false)
        }
    }

  if(!imgUrl)return;
    return(
        <View style={styles.restItem}>
            <Pressable onPress={()=>router.push({pathname:'/RestArea',  params: {stdRestNm: props.stdRestNm}})}>
            <Image style={styles.restImg} source={{uri:imgUrl}} width={180}/>
            <View style={styles.restDetail}>
                <Text style={[styles.text,{fontSize:15}]}>{props.stdRestNm}</Text>
                <Text style={[styles.text,{fontSize:13, color: Colors.yellow}]}>
                {
                    Array.from({length: 5}, (_, i)=> i + 1).map((i) => {
                        if(i<=Math.round(props.reviewAVG))return '★' 
                        else return '☆'
                    })
                }
                </Text>
                <Text style={[styles.text,{marginVertical:3}]}>경유 {props.diselPrice}  휘발유 {props.gasolinePrice}</Text>
                <View style={styles.row}>
                    <Text style={[styles.text,{marginVertical:3, marginRight:17}]}>브랜드</Text>
                    <View style={styles.tagContainer}>
                    {
                        props.brands.map((brand)=>{
                            if(!brandImg[brand])return;
                            return <TagCustom  key={brand} isRestItem={true}  name={brand} isbrand={true} icon={brandImg[brand].icon}/>
                        })
                    }
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.text,{marginVertical:3, marginRight:8}]}>편의시설</Text>
                    <View style={styles.tagContainer}>
                    {
                        props.facilities.map((facil)=>{
                        if(!AmenitiesIcon[facil])return;
                        return <TagCustom key={facil} isRestItem={true} name={facil} icon={AmenitiesIcon[facil].icon}/>
                        })
                    }
                    </View>
                </View>
            </View>
            <View style={styles.reaction}>
                <AntDesign name="heart" size={15} color={Colors.lightGrey} style={styles.icon} /><Text style={styles.reactState}>12</Text>
                <Entypo name="message" size={15} color={Colors.lightGrey} style={styles.icon} /><Text style={styles.reactState}>12</Text>
                {
                    marked ? (
                        <Pressable onPress={()=>handleDownMark()}><Ionicons name="bookmark" size={15} color={Colors.yellow} style={styles.icon} /></Pressable>
                    ) : 
                    (
                        <Pressable onPress={()=>handleMark()}><Ionicons name="bookmark" size={15} color={Colors.lightGrey} style={styles.icon} /></Pressable>
                    )
                }
            
            </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    restItem: {
        width: 180,
        height: 240,
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden',
        marginRight: 15
    },
    restImg: {
        width: '100%',
        height: 100
    },
    restDetail: {
        padding: 11,
    },
    text: {
        fontFamily: 'Paperlogy',
        fontWeight: 500,
        fontSize: 10,
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
        fontSize: 12
    },
    row: {
        flexDirection: 'row',
    },
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap:'wrap',
    },
});

export default MainRestItem;
