import { View, Image, StyleSheet, Text } from "react-native"
import { Colors } from "@/constants/Colors"


const RestItem = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.routeImg} source={require('@/assets/images/test-rest-route.png')}/>
      <View style={styles.restDetail}>
        <Text style={[styles.text,{fontSize:15, fontWeight:'bold'}]}>청도새마을휴개소</Text>
        <Text style={[styles.text,{fontSize:13, color: Colors.yellow}]}>★★★☆☆</Text>
        <Text style={[styles.text,{marginVertical:3}]}>경유 1,234  휘발유 1,234</Text>
        <Text style={[styles.text,{marginVertical:3}]}>브랜드</Text>
        <Text style={[styles.text,{marginVertical:3}]}>편의시설</Text>
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
  },
  restDetail: {
    width: 200,
    backgroundColor: Colors.background,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    padding: 12,
  }, 
  text: {
    fontFamily: 'Paperlogy',
    fontWeight: 500,
    fontSize: 10,
  }
})

export default RestItem