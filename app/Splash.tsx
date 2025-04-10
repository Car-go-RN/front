import { View, Text, StyleSheet } from 'react-native';
import { Colors } from "@/constants/Colors";

export default function Splash() {

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>스플래쉬화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue'
  },
  buttonText: {
    color: Colors.background
  }
});
