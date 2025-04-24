import ProfileHeader from "@/components/ui/ProfileHeader"
import { View, StyleSheet } from "react-native"
import InputCustom from "@/components/ui/InputCustom"
import ButtonCustom from "@/components/ui/ButtonCustom"
import { Colors } from "@/constants/Colors"

const EmailUpdate = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <View style={{marginTop: 40}}>
        <InputCustom 
          label="새 이메일"
          placeholder="이메일을 입력하세요."
          type="email"
          isSignup={true}
        />
        <InputCustom 
          label="인증번호"
          placeholder="C2J3D2"
          type="authNum"
          isSignup={true}
        />
        <View style={{marginTop: 300}}>
          <ButtonCustom
            text="변경하기"            
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.background,
  }
})

export default EmailUpdate;