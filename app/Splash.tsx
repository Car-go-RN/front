import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Splash() {

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>스플래쉬하면</Text>
      <TouchableOpacity style={[styles.button, {marginTop: "auto"}]} >
          <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#fff'
  }
});
