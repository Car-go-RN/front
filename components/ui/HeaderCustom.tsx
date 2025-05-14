import { StyleSheet, Image, View, Pressable } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { usePathname, useRouter } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "@/constants/Colors"
import React from "react"

const HeaderCustom = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Pressable onPress={()=>router.push('/')}><AntDesign name="arrowleft" size={28} color={pathname==='/RestArea' || pathname==='/search/routeQuest' ? Colors.background: Colors.icon} /></Pressable>
      {
        pathname==='/RestArea'|| pathname==='/search/routeQuest'? (
          <Pressable onPress={()=>router.push('/profile/MyPage')}><Ionicons name="person-outline" size={24} color="white" /></Pressable>
        ) : pathname !== '/Survey' && (
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