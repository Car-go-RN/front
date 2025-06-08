import { View, Image, StyleSheet, Text, GestureResponderEvent, Pressable } from "react-native"
import { Colors } from "@/constants/Colors"
import { Foundation } from "@expo/vector-icons"
import { useState } from "react"
import { useRouter } from "expo-router"
import TagCustom from "./TagCustom"
import { brandImg } from "@/constants/BrandImg"
import { amenities } from "@/constants/TagMock"

type RestMark = {
  isMark?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const RestItem:React.FC<RestMark> = ({isMark = false}) => {
  const router = useRouter()
  const [marked, setMarked] = useState(isMark);
  const handleMark = () => {
    setMarked(true)
  }
  const handleDownMark = () => {
    setMarked(false)
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={()=>router.push('/RestArea')} style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image style={styles.routeImg} source={require('@/assets/images/test-rest-route.png')}/>
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
          <Text style={[styles.text,{fontSize:15, fontWeight:'bold'}]}>청도새마을휴개소</Text>
          <Text style={[styles.text,{fontSize:13, color: Colors.yellow}]}>★★★☆☆</Text>
          <Text style={[styles.text,{marginVertical:3}]}>경유 1,234  휘발유 1,234</Text>
          <View style={{flex: 1, overflow:'scroll'}}>
            <View style={styles.row}>
              <Text style={[styles.text,{marginVertical:3, marginRight:17}]}>브랜드</Text>
              <View style={styles.tagContainer}>
                <TagCustom isRestItem={true}  name="CU" isbrand={true} icon={brandImg.CU.icon}/> <TagCustom isRestItem={true}  name="던킨도너츠" isbrand={true} icon={brandImg.던킨도너츠.icon}/> <TagCustom isRestItem={true}  name="베스킨라빈스" isbrand={true} icon={brandImg.베스킨라빈스.icon}/>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={[styles.text,{marginVertical:3, marginRight:8}]}>편의시설</Text>
                <View style={styles.tagContainer}>
                  <TagCustom isRestItem={true} name="병원" icon={amenities[6].icon}/> <TagCustom isRestItem={true} name="약국" icon={amenities[2].icon}/> <TagCustom isRestItem={true} name="경정비소" icon={amenities[9].icon}/>
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