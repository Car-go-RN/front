import { StyleSheet, Image, View } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"

const HeaderCustom = () => {
  return (
    <View style={styles.container}>
      <AntDesign name="arrowleft" size={28} color={Colors.icon} />
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