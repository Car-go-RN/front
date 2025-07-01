import ProfileHeader from "@/components/ui/ProfileHeader"
import { View, StyleSheet, ScrollView, Alert } from "react-native"
import { Colors } from "@/constants/Colors"
import RestItem from "@/components/ui/RestItem"
import CategoryCustom from "@/components/ui/CategoryCustom"
import { useEffect, useState } from "react"
import { getMyFavorite } from "@/api/RestAreaAPI"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useRouter } from "expo-router"

const list = [{id:1},{id:2},{id:3},{id:4}]

const LookBookMark = () => {
  const router = useRouter();
  const userId = useSelector((state:RootState)=>state.user).user?.userId;

  const [isChange, setIsChange] = useState<boolean>(true);
  const [bookMarks, setBookMarks] = useState<Record<string, string | number | string[] | Record<string,string>[]>[]>([])

  useEffect(() => {
    if(!userId){
      Alert.alert('즐겨찾기 목록 불러오기 실패', '유효하지 않은 접근입니다');
      router.push('/profile/MyPage');
    }
  }, [userId])

  useEffect(()=>{
    const getBookMarks = async () => {
      const res = await getMyFavorite({userId: userId as number});
      if(res.pass){
        setBookMarks(res.data);
      }
      else {
        Alert.alert('즐겨찾기 목록 불러오기 실패', '데이터를 불러오지 못했습니다');
        router.push('/profile/MyPage');
      }
      setIsChange(false);
    }
    if(isChange)getBookMarks()
  },[isChange])

  const bookMarkChange = () => {
      setIsChange(true);
  }


  return (
    <View style={styles.container}>
      <ProfileHeader name="즐겨찾기"/>
      <CategoryCustom />
        <ScrollView showsVerticalScrollIndicator={false}>       
          {
              bookMarks.map((item)=>(
                <RestItem 
                  key={item.id as number}
                  isMark={true}
                  restId={item.id as number}
                  stdRestNm={item.stdRestNm as string}
                  restName={item.restAreaNm as string}
                  gasPrice={item.gasolinePrice as string}
                  diselPrice={item.diselPrice as string}
                  lpgPrice={item.lpgPrice as string}
                  address={item.roadAddress as string}
                  phone={item.phone as string}
                  latitude={item.latitude as number}
                  longitude={item.longitude as number}
                  brands={item.brands as string[]}
                  facilities={item.facilities as string[]}
                  foods={item.foods as Record<string, string>[]}
                  bookMarkChange={bookMarkChange} 
                  reviewAVG={item.reviewAVG as number}                />
              ))
          }
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.background,
  }, 
})

export default LookBookMark;