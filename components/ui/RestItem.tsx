import { View, Image, StyleSheet, Text, GestureResponderEvent, Pressable } from "react-native"
import { Colors } from "@/constants/Colors"
import { Foundation } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import TagCustom from "./TagCustom"
import { brandImg } from "@/constants/BrandImg"
import { getRestImg, postMyFavorite } from "@/api/RestAreaAPI"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { AmenitiesIcon } from "@/constants/AmenitiesIcon"

type RestMark = {
  isMark?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  bookMarkChange: () => void,
  restId: number,
  stdRestNm: string,//화면에 표시되는 이름
  restName: string, //파라미터로 보낼 이름
  reviewAVG:number,
  gasPrice:string,
  diselPrice: string,
  lpgPrice:string,
  address: string,
  phone:string,
  latitude: number,
  longitude:number,
  brands: string[],
  facilities: string[],
  foods: Record<string, string>[]
}

const RestItem:React.FC<RestMark> = (props) => {
  const router = useRouter()
  const userId = useSelector((state:RootState) => state.user).user?.userId;
  const [marked, setMarked] = useState(props.isMark);
  const [imgUrl, setImgUrl] = useState<string>('');

  useEffect(()=>{
    const getRestImgUrl = async () => {
      const res = await getRestImg({restName: props.restName})
      if(res.pass){
        setImgUrl(res.data);
      }
    }
    getRestImgUrl();
  },[])

  const handleMark = async () => {
    const res = await postMyFavorite({restAreaId:props.restId, userId: userId as number})
    if(res.pass){
      //useState로 관리하는 거 수정 필요 ( api 연결해서 휴게소 즐겨찾기 값에 따라 나오게)
      setMarked(true)
      // props.bookMarkChange()
    }
  }
  const handleDownMark = async () => {
    const res = await postMyFavorite({restAreaId:props.restId, userId: userId as number})
    if(res.pass){
      setMarked(false)
      // props.bookMarkChange();
    }
  }

  if(!imgUrl)return;
  return (
    <View style={styles.container}>
      <Pressable onPress={()=>router.push({pathname:'/RestArea', params: {stdRestNm: props.stdRestNm}})} style={{flexDirection: 'row', justifyContent: 'center'}}>
        {
          imgUrl && (
            <Image style={styles.routeImg} source={{uri:imgUrl}} width={150}/>
          )
        }
        <View style={styles.restDetail}>
        <View style={styles.bookmark}>
            {
              marked ? (
                  <Foundation name="bookmark" size={32} color={Colors.yellow} onPress={handleDownMark}/>
              ) : 
              (
                  <Foundation name="bookmark" size={32} color={Colors.lightGrey} onPress={handleMark}/>
              )
            }
          </View>
          <Text style={[styles.text,{fontSize:15, fontWeight:'bold'}]}>{props.stdRestNm}</Text>
          <Text style={[styles.text,{fontSize:13, color: Colors.yellow}]}>
          {
              Array.from({length: 5}, (_, i)=> i + 1).map((i) => {
                  if(i<=Math.round(props.reviewAVG))return '★' 
                  else return '☆'
              })
          }
          </Text>
          <Text style={[styles.text,{marginVertical:3}]}>경유 {props.diselPrice}  휘발유 {props.gasPrice}</Text>
          <View style={{flex: 1, overflow:'scroll'}}>
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
        </View>
      </Pressable>
    </View>   
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginHorizontal: 'auto',
    minHeight: 136,
    width: 340,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  routeImg: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    height: 136,
  },
  restDetail: {
    width: 200,
    height: 136,
    backgroundColor: Colors.background,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    padding: 12,
    position: 'relative',
  },
  text: {
    fontFamily: 'Paperlogy',
    fontWeight: 500,
    fontSize: 10,
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap:'wrap',
  },
  bookmark: {
    position: 'absolute',
    top: 4,
    right: 8,
    zIndex: 1,
  },
  icon: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
  }
})

export default RestItem