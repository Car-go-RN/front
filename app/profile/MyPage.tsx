import MainHeader from "@/components/ui/MainHeader";
import { View, StyleSheet, Text, Pressable } from "react-native"
import { Colors } from "@/constants/Colors";
import ButtonCustom from "@/components/ui/ButtonCustom";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";


const MyPage = () => {
  return (
    <View style={styles.container}>
      <MainHeader />
      <Text style={[styles.text, {marginVertical: 20}]}><Text style={{color: Colors.tint}}>설문조사</Text>를 하면{'\n'}나에게 맞는 휴게소를{'\n'}<Text style={{color: Colors.tint}}>더 빠르고 간편하게</Text> 찾을 수 있어요</Text>
      <Pressable>
        <ButtonCustom text="설문조사 하러가기"/>
      </Pressable>
      <View style={{marginVertical: 20,}}>
        <Pressable style={styles.border}>
          <MaterialIcons name="email" size={18} />
          <Text style={styles.borderText}>이메일 변경하기</Text>
        </Pressable>
        <Pressable style={styles.border}>
          <FontAwesome5 name="lock" size={16} />
          <Text style={styles.borderText}>비밀번호 변경하기</Text>
        </Pressable>
        <Pressable style={styles.border}>
          <FontAwesome5 name="bookmark" size={16} color={Colors.tint} />
          <Text style={styles.borderText}>즐겨찾기한 휴게소 보러가기</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  text:{
    fontFamily:'Paperlogy',
    marginLeft: 15,
    paddingHorizontal: 20,
  },
  border: {
    borderColor: Colors.lightGrey,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 28,
    flexDirection: 'row',
  },
  borderText: {
    fontFamily:'Paperlogy',
    marginHorizontal: 4,
  }
})

export default MyPage;