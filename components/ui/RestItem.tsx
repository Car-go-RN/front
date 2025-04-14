import { View, Image, StyleSheet, Text } from "react-native"
import { Colors } from "@/constants/Colors"
import { Foundation } from "@expo/vector-icons"
import { useState } from "react"
import TagCustom from "./TagCustom"

type RestMark = {
  isMark?: boolean;
}

const RestItem:React.FC<RestMark> = ({isMark = false}) => {
  const [marked, setMarked] = useState(isMark);
  const handleMark = () => {
    setMarked(true)
  }
  const handleDownMark = () => {
    setMarked(false)
  }
  return (
    <View style={styles.container}>
      <Image style={styles.routeImg} source={require('@/assets/images/test-rest-route.png')}/>
      <View style={styles.restDetail}>
        <Text style={[styles.text,{fontSize:15, fontWeight:'bold'}]}>청도새마을휴개소</Text>
        <Text style={[styles.text,{fontSize:13, color: Colors.yellow}]}>★★★☆☆</Text>
        <Text style={[styles.text,{marginVertical:3}]}>경유 1,234  휘발유 1,234</Text>
        <View style={styles.row}>
          <Text style={[styles.text,{marginVertical:3, marginRight:17}]}>브랜드</Text>
          <View style={styles.tagContainer}>
            <TagCustom isRestItem={true}/> <TagCustom isRestItem={true}/> <TagCustom isRestItem={true}/> <TagCustom isRestItem={true}/>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text,{marginVertical:3, marginRight:8}]}>편의시설</Text>
            <View style={styles.tagContainer}>
            <TagCustom isRestItem={true}/> <TagCustom isRestItem={true}/> <TagCustom isRestItem={true}/> <TagCustom isRestItem={true}/>
          </View>
        </View>        
        <View style={styles.bookmark}>
          {
            marked ? (
              <View>
                <Foundation name="bookmark" size={32} color={Colors.yellow} onPress={handleDownMark}/>
              </View>
            ) : 
            (
              <View>
                <Foundation name="bookmark" size={32} color={Colors.lightGrey} onPress={handleMark}/>
              </View>
            )
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row',
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
    position: 'relative',
    left: 160,
    bottom: 128,
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