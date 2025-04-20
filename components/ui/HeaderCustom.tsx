import { StyleSheet, Image, View, Pressable } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "@/constants/Colors"
import React from "react"

type headerProps = {
  isDetail?: boolean;
}

const HeaderCustom: React.FC<headerProps> = ({isDetail}) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable onPress={()=>router.push('/Main')}><AntDesign name="arrowleft" size={28} color={isDetail ? Colors.background: Colors.icon} /></Pressable>
      {
        isDetail ? (
          <Pressable onPress={()=>router.push('/profile/MyPage')}><Ionicons name="person-outline" size={24} color="white" /></Pressable>
        ) : (
          <Image source={require('../../assets/images/카GO바지logo2.png')} />
        )
      }
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