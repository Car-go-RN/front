import { StyleSheet, Image, View, Pressable } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Colors } from "@/constants/Colors"

const HeaderCustom = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable onPress={()=>router.push('/Main')}><AntDesign name="arrowleft" size={28} color="#ADB3B1" /></Pressable>
      <Image source={require('../../assets/images/카GO바지logo2.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginTop: 32,
  },
})

export default HeaderCustom