import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState, useEffect, use } from "react";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import HeaderCustom from "./HeaderCustom";
import { useRouter } from "expo-router";
import CategoryCustom from "./CategoryCustom";
import { getRestAreaAlong } from "@/api/RestAreaAPI";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setStartCoord, setEndCoord, setRestAreas } from "../../store/slices/restAreaSlice";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { getSearchCategory, getSearchKeyword } from "@/api/SearchAPI";
import { resetCategories } from "@/store/slices/CategorySlices";
import { RootState } from "@/store/store";
import SearchList from "./SearchList";

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

const KAKAO_REST_API_KEY = "21c007d7b5198e405afbe01b9ecee99e";

const MainHeader:React.FC<MainHeaderProps> = ({isRoute}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {location} = useCurrentLocation();
    const selectedCategories = useSelector((state:RootState) => state.category, shallowEqual);

    const [go, setGo] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [localStartCoord, setLocalStartCoord] = useState<{ lat: number; lng: number } | null>(null);
    const [localEndCoord, setLocalEndCoord] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [searchItems, setSearchItems] = useState<SearchDataType[]>([]);
    const [keyword, setKeyword] = useState<string>('');

    const fetchKakaoCoordinates = async (query: string) => {
      try {
        const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `KakaoAK ${process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY}`
          }
        });
        const data = await response.json();
  
        if (data.documents && data.documents.length > 0) {
          const doc = data.documents[0];
          return { lat: Number(doc.y), lng: Number(doc.x) };
        } else {
          setError("주소를 찾을 수 없습니다.");
          return null;
        }
      } catch (e) {
        setError("네트워크 오류가 발생했습니다.");
        return null;
      }
    };
  
  // 좌표 받아오기
  useEffect(() => {
    const getCoords = async () => {
      if (go && end) {
        setError(null);
        const start = await fetchKakaoCoordinates(go);
        const destination = await fetchKakaoCoordinates(end);
        if (start) {
          setLocalStartCoord(start); // 로컬 상태
          dispatch(setStartCoord(start)); // Redux
        }
        if (destination) {
          setLocalEndCoord(destination); // 로컬 상태
          dispatch(setEndCoord(destination)); // Redux
        }
      }
    };
    getCoords();
  }, [go, end]);

  useEffect(() => {
    const fetchRestAreas = async () => {
      if (localStartCoord && localEndCoord) {
        try {
          const data = await getRestAreaAlong(localStartCoord.lng, localStartCoord.lat, localEndCoord.lng, localEndCoord.lat);
          dispatch(setRestAreas(data));
        } catch (e) {
          setError('휴게소 정보를 불러오는데 실패했습니다.');
        }
      }
    };
    fetchRestAreas();
  }, [localStartCoord, localEndCoord]);
    
    useEffect(() => {
      const fetchRestAreas = async () => {
        if (localStartCoord && localEndCoord) {
          try {
            const data = await getRestAreaAlong(localStartCoord.lng, localStartCoord.lat, localEndCoord.lng, localEndCoord.lat);
            dispatch(setRestAreas(data));
          } catch (e) {
            setError('휴게소 정보를 불러오는데 실패했습니다.');
          }
        }
      };
      fetchRestAreas();
    }, [localStartCoord, localEndCoord]);

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

    useEffect(()=>{
        if(keyword===''){
            setSearchItems([]);
            return;
        }

        const debounceKeyword = setTimeout(()=>{
            const getSearchItems = async () => {
                const res = await getSearchKeyword({keyword: keyword});
                if(res.pass){
                    setSearchItems(res.data);
                }
            }
            getSearchItems();
        },500);

        return ()=>{
            clearTimeout(debounceKeyword);
        }

    },[keyword])

    const resetSearchItems = () => {
        setSearchItems([]);
        dispatch(resetCategories());
    }

    const onChangeKeyword = (text: string) => {
        setKeyword(text);
    }

    return(
        <View style={{position:'relative'}}>
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
                                    style={[styles.inputRoute, {borderTopLeftRadius:8, borderTopRightRadius:8}]} 
                                    value={go}
                                    onChangeText={setGo}/>
                                <TextInput 
                                    placeholder="도착지 입력" 
                                    placeholderTextColor={Colors.placeholder}
                                    style={[styles.inputRoute, {borderBottomLeftRadius:8, borderBottomRightRadius:8, borderTopWidth:0}]}
                                    value={end}
                                    onChangeText={setEnd} />
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
                                value={keyword}
                                onChangeText={onChangeKeyword}
                                placeholderTextColor={Colors.placeholderGreen}
                            />
                        </View>
                    </View>
                )
            } 
            </View>
            <CategoryCustom />   
            {
              searchItems.length !== 0 && (
                <View style={{height:360}}>
                    <SearchList data={searchItems} reset={resetSearchItems}/>
                </View>
              )
            }
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