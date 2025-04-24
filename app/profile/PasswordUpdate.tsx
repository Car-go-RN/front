import ProfileHeader from "@/components/ui/ProfileHeader"
import { View, StyleSheet } from "react-native"
import InputCustom from "@/components/ui/InputCustom"
import ButtonCustom from "@/components/ui/ButtonCustom"
import { Colors } from "@/constants/Colors"

const PasswordUpdate = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <View style={{marginTop: 40}}>
        <InputCustom 
          label="현재 비밀번호"
          placeholder="현재 비밀번호를 입력해주세요."
          type="email"
        />
        <InputCustom 
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해주세요."
          type="password"
        />
        <InputCustom 
          label="새 비밀번호 재확인"
          placeholder="새 비밀번호를 재입력해주세요."
          type="password"
        />
        <View style={{marginTop: 220}}>
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

export default PasswordUpdate;