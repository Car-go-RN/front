import React from "react";
import { Pressable, Text, StyleSheet, GestureResponderEvent } from "react-native";

type ButtonCustomProps = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const ButtonCustom: React.FC<ButtonCustomProps> = ({ text, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    backgroundColor: '#25CCA0',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto'
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Paperlogy'
  },
});

export default ButtonCustom;
