import React, { useReducer} from "react"
import ProfileHeader from "@/components/ui/ProfileHeader"
import { View, StyleSheet, Alert } from "react-native"
import InputCustom from "@/components/ui/InputCustom"
import ButtonCustom from "@/components/ui/ButtonCustom"
import { Colors } from "@/constants/Colors"
import { changePassword } from "@/api/AuthAPI"
import { useRouter } from "expo-router"

type FormState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Action =
  | { type: 'CHANGE_INPUT'; name: keyof FormState; value: string }
  | { type: "RESET"};

const initialForm: FormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.name]: action.value };
    case "RESET":
      return initialForm;
    default:
      return state;
  }
}

const PasswordUpdate = () => {
  const [form, dispatch] = useReducer(formReducer, initialForm);
  const router = useRouter();

  const handlePasswordChange = async () => {
    if (!form.currentPassword || !form.newPassword) {
      Alert.alert("입력 오류", "모든 항목을 입력해주세요.");
    }
    
    if (form.newPassword !== form.confirmPassword) {
      Alert.alert("비밀번호 불일치", "새 비밀번호가 서로 다릅니다.");
      return;
    }

    const res = await changePassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    });

    if (res.pass) {
      Alert.alert("성공", "비밀번호가 변경되었습니다.");
      dispatch({ type: "RESET"});
      router.push('/')
    } else {
      Alert.alert("실패", res.data);
    }
  }
  return (
    <View style={styles.container}>
      <ProfileHeader name="비밀번호 변경"/>
      <View style={{marginTop: 40}}>
        <InputCustom 
          label="현재 비밀번호"
          placeholder="현재 비밀번호를 입력해주세요."
          type="password"
          onChangeText={(text) =>
            dispatch({ type: "CHANGE_INPUT", name: "currentPassword", value: text })
          }
        />
        <InputCustom 
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해주세요."
          type="password"
          onChangeText={(text) =>
            dispatch({ type: "CHANGE_INPUT", name: "newPassword", value: text })
          }
        />
        <InputCustom 
          label="새 비밀번호 재확인"
          placeholder="새 비밀번호를 재입력해주세요."
          type="password"
          onChangeText={(text) =>
            dispatch({ type: "CHANGE_INPUT", name: "confirmPassword", value: text })
          }
        />
        <View style={{marginTop: 220}}>
          <ButtonCustom
            text="변경하기" 
            onPress={handlePasswordChange}           
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