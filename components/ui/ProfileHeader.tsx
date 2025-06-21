import React from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter, usePathname } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CategoryCustom from "./CategoryCustom";
import ButtonCustom from "./ButtonCustom";

type ProfileHeaderProps = {
  isCategory?:boolean,
  isSurvey?:boolean,
  name: string,
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({isCategory, isSurvey, name}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleBack = () => {
    if (pathname === '/profile/MyPage') {
      router.push('/');
    } else {
      router.push('/profile/MyPage');
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={{flexDirection:"row", marginTop:50, marginLeft:28}}>
          <Pressable onPress={handleBack}><AntDesign name="arrowleft" size={28} color={Colors.background} /></Pressable>
          <Text style={[styles.text,{lineHeight:28, marginLeft:4}]}>{name}</Text>
        </View>
        <View style={styles.container}> 
          <Image style={styles.img} source={require('@/assets/images/person.png')}/>
          <Text style={[styles.text, {textAlign:'center'}]}>lioba00700@gmail.com</Text>
        </View>
      </View>
      {isCategory && <CategoryCustom />}
      {
          isSurvey && (
            <View>
              <Text style={[styles.surveyText, {marginVertical: 20}]}><Text style={{color: Colors.tint}}>설문조사</Text>를 하면{'\n'}나에게 맞는 휴게소를{'\n'}<Text style={{color: Colors.tint}}>더 빠르고 간편하게</Text> 찾을 수 있어요</Text>
              <ButtonCustom text="설문조사 하러가기" onPress={() => router.push('/Survey')}/>
            </View>
          )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: Colors.tint,
    width: '100%',
    height: 212,
  },
  container:{
    display:'flex',
    justifyContent:'space-between',
    width: '85%',
    alignSelf:'center',
    marginTop: 12,
  },
  img:{
    marginHorizontal: 'auto',
    marginBottom: 10,
  },
  routeContainer: {
    width: '85%',
    alignSelf:'center',
    marginLeft: 28,
  },
  inputRoute: {
    width: '90%',
    height: 40,
    margin: 0,
    fontFamily: 'Paperlogy',
    fontSize: 13,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    paddingLeft: 10,
  },
  text:{
    fontFamily: 'Paperlogy',
    fontSize: 16,
    fontWeight: 400,
    color: Colors.background,
    lineHeight: 23,
  },
  surveyText:{
    fontFamily:'Paperlogy',
    marginLeft: 15,
    paddingHorizontal: 20,
  },
  searchBox:{
    width: '85%',
    height: 40,
    backgroundColor: Colors.tintDark,
    alignSelf:'center',
    alignItems:'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    display:'flex',
    flexDirection:'row'
  },
  searchInput:{
    fontFamily:'Paperlogy',
    fontSize: 14,
    paddingLeft:10
  }
})

export default ProfileHeader;