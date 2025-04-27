import ProfileHeader from "@/components/ui/ProfileHeader"
import { View, StyleSheet, ScrollView } from "react-native"
import { Colors } from "@/constants/Colors"
import RestItem from "@/components/ui/RestItem"
import CategoryCustom from "@/components/ui/CategoryCustom"

const list = [{id:1},{id:2},{id:3},{id:4}]

const LookBookMark = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader name="즐겨찾기"/>
      <CategoryCustom />
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>       
          {
              list.map((item)=>(
                <RestItem />
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
  scroll: {
    marginLeft:20,
  }
})

export default LookBookMark;