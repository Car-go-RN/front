import { View, StyleSheet, Text, Pressable, Alert } from "react-native"
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import ProfileHeader from "@/components/ui/ProfileHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlices";
import * as SecureStore from 'expo-secure-store'
import { useEffect, useRef } from "react";


const MyPage = () => {
  const router = useRouter();
  const userId = useSelector((state:RootState)=>state.user).user?.userId;
  const dispatch = useDispatch();
  const hasShownAlert = useRef(false);

  useEffect(() => {
    if(!userId) {
      // hasShownAlert.current = true;
      Alert.alert('로그인 정보 오류', '로그인이 필요한 기능입니다.', [
      { text: "확인", onPress: () => router.push('/') }
    ])
  }
  }, [userId])

  //userId 없으면 아무것도 렌더링하지 않음 
  if (!userId) return null;

  const handleLogout = async () => {
    Alert.alert("로그아웃", "정말 로그아웃하시겠습니까?", [
      {
        text: "취소",
        style: "cancel"
      },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: async () => {
          //Redux 초기화
          dispatch(logout());
          // SecureStore 토큰 삭제
          await SecureStore.deleteItemAsync('accessToken');
          router.replace('/');
          return;
        }
      }
    ])
  }
  return (
    <View style={styles.container}>
      <ProfileHeader isSurvey={true} name="마이페이지"/>
 
      <View style={{marginVertical: 20,}}>
        <Pressable style={styles.border} onPress={()=>router.push('/profile/PasswordUpdate')}>
          <View style={{flexDirection: 'row', alignItems:'center', gap: 4}}>
            <FontAwesome5 name="lock" size={16} color={Colors.grey} style={[styles.icon, {marginLeft:-1}]}/>
            <Text style={styles.borderText}>비밀번호 변경하기</Text>
          </View>
          <View>
            <Entypo name="chevron-right" size={16} color={Colors.grey}/>
          </View>
        </Pressable>
        <Pressable style={styles.border} onPress={()=>router.push('/profile/LookBookMark')}>
          <View style={{flexDirection: 'row', alignItems:'center', gap: 6}}>
            <FontAwesome name="bookmark" size={16} color={Colors.tint} style={styles.icon}/>
            <Text style={styles.borderText}>즐겨찾기한 휴게소 보러가기</Text>
          </View>
          <View>
            <Entypo name="chevron-right" size={16} color={Colors.grey}/>
          </View>
        </Pressable>
      </View>
      <View style={{marginTop:'auto', marginBottom:40, position:'relative'}}>
        <Pressable style={[styles.border, {justifyContent: 'flex-end'}]} onPress={handleLogout}>
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
  icon: {
    marginRight: 8,
  },
  border: {
    borderColor: Colors.lightGrey,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderText: {
    fontFamily:'Paperlogy',
    color: Colors.grey,
    lineHeight: 18,
  },
  logout: {
    color: Colors.red,
  },
})

export default MyPage;