import { View, StyleSheet, Text, Pressable } from "react-native"
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import ProfileHeader from "@/components/ui/ProfileHeader";


const MyPage = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ProfileHeader isSurvey={true}/>
      <View style={{marginVertical: 20,}}>
        <Pressable style={styles.border} onPress={()=>router.push('/profile/EmailUpdate')}>
          <View style={{flexDirection: 'row'}}>
            <MaterialIcons name="email" size={18} color={Colors.grey}/>
            <Text style={styles.borderText}>이메일 변경하기</Text>
          </View>
          <View>
            <Entypo name="chevron-right" size={16} color={Colors.grey}/>
          </View>
        </Pressable>
        <Pressable style={styles.border} onPress={()=>router.push('/profile/PasswordUpdate')}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5 name="lock" size={16} color={Colors.grey}/>
            <Text style={styles.borderText}>비밀번호 변경하기</Text>
          </View>
          <View>
            <Entypo name="chevron-right" size={16} color={Colors.grey}/>
          </View>
        </Pressable>
        <Pressable style={styles.border} onPress={()=>router.push('/profile/LookBookMark')}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name="bookmark" size={16} color={Colors.tint} />
            <Text style={styles.borderText}>즐겨찾기한 휴게소 보러가기</Text>
          </View>
          <View>
            <Entypo name="chevron-right" size={16} color={Colors.grey}/>
          </View>
        </Pressable>
      </View>
      <View style={{marginTop:'auto', marginBottom:40, position:'relative'}}>
        <Pressable style={[styles.border, {justifyContent: 'flex-end'}]}>
          <Feather name="log-out" size={18} color={Colors.red} />
          <Text style={[styles.borderText, styles.logout]}>로그아웃</Text>
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
    justifyContent: 'space-between'
  },
  borderText: {
    fontFamily:'Paperlogy',
    marginHorizontal: 4,
    color: Colors.grey,
    lineHeight: 18,
  },
  logout: {
    color: Colors.red,
  }
})

export default MyPage;