import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useReducer, useState } from "react";
import { View, StyleSheet, Text, Pressable, TextInput, Alert } from "react-native";
import HeaderCustom from "./HeaderCustom";
import { useRouter } from "expo-router";
import CategoryCustom from "./CategoryCustom";
import SearchList from "./SearchList";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getSearchCategory } from "@/api/SearchAPI";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { resetCategories } from "@/store/slices/CategorySlices";

type MainHeaderProps = {
    isRoute?:boolean,
}

export type SearchDataType = {
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

const MainHeader:React.FC<MainHeaderProps> = ({isRoute}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {location} = useCurrentLocation();
    const selectedCategories = useSelector((state:RootState) => state.category, shallowEqual);

    const [searchItems, setSearchItems] = useState<SearchDataType[]>([]);

    useEffect(()=>{
        const getSearchItems = async () => {
            console.log(selectedCategories);
            if(!location){
                console.log('위치 없음');
                return;
            }
            const res = await getSearchCategory({
                brands: selectedCategories.brands,
                facilities: selectedCategories.facilities, 
                gas: selectedCategories.gas, 
                currentLat: location.coords.latitude, 
                currentLng: location.coords.longitude
            });
            if(res.pass){
                setSearchItems(res.data);
            }
        }
        getSearchItems();
    },[selectedCategories])

    const resetSearchItems = () => {
        setSearchItems([]);
        dispatch(resetCategories());
    }

    return(
        <View style={{position:'relative', height: '100%'}}>
            <View style={styles.header}>
            {
                isRoute ? (
                    <View style={{marginTop: -10}}>
                        <HeaderCustom />
                        <View style={styles.routeContainer}>
                            <Text style={[styles.textBold, styles.text,{marginBottom:4, marginTop:-4}]}>내 경로 입력</Text>
                            <View>
                                <TextInput 
                                    placeholder="출발지 입력" 
                                    placeholderTextColor={Colors.placeholder}
                                    style={[styles.inputRoute, {borderTopLeftRadius:8, borderTopRightRadius:8}]}>
                                </TextInput>
                                <TextInput 
                                    placeholder="도착지 입력" 
                                    placeholderTextColor={Colors.placeholder}
                                    style={[styles.inputRoute, {borderBottomLeftRadius:8, borderBottomRightRadius:8, borderTopWidth:0}]}>
                                </TextInput>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View>
                        <View style={styles.container}>
                            <Text style={styles.text}><Text style={styles.textBold}>카Go바지</Text>를 통해{'\n'}편하게 쉴 수 있는 휴게소를{'\n'}<Text style={styles.textBold}>추천</Text> 받아보세요!</Text>
                            <Pressable onPress={()=>router.push('/profile/MyPage')}><Ionicons name="person-outline" size={24} color="white" /></Pressable>
                        </View>
                        <View style={styles.searchBox}>
                            <Pressable><AntDesign name="search1" size={18} color={Colors.placeholderGreen} /></Pressable>
                            <TextInput 
                                style={styles.searchInput}
                                placeholder="검색어/키워드를 입력해 보세요."
                                placeholderTextColor={Colors.placeholderGreen}
                            />
                        </View>
                    </View>
                )
            } 
            </View>
            <CategoryCustom />
            <View style={{height:360}}>
                <SearchList data={searchItems} reset={resetSearchItems}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: Colors.tint,
        width: '100%',
        height: 200
    },
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 60,
        marginBottom: 18,
        width: '85%',
        alignSelf:'center'
    },
    routeContainer: {
        width: '85%',
        alignSelf:'center',
        marginLeft: 28,
    },
    inputRoute: {
        width: '90%',
        height: 35,
        margin: 0,
        fontFamily: 'Paperlogy',
        fontSize: 13,
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        paddingLeft: 10,
    },
    text:{
        fontFamily: 'Paperlogy',
        fontSize: 16,
        fontWeight: 400,
        color: Colors.background,
        lineHeight: 23,
    },
    textBold:{
        fontWeight: 600
    },
    searchBox:{
        width: '85%',
        height: 40,
        backgroundColor: Colors.tintDark,
        alignSelf:'center',
        alignItems:'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        display:'flex',
        flexDirection:'row'
    },
    searchInput:{
        fontFamily:'Paperlogy',
        fontSize: 14,
        paddingLeft:10
    }
});

export default MainHeader;