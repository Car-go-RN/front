import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, Text, StyleSheet, GestureResponderEvent } from "react-native";


type ButtonCustomProps = {
  text: string;
  outline?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

const ButtonCustom: React.FC<ButtonCustomProps> = ({ text, outline, onPress }) => {
  return (
    <Pressable style={[styles.button, outline && styles.outline]} onPress={onPress}>
      <Text style={[styles.text, {color: outline ? Colors.tint : undefined}]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    backgroundColor: Colors.tint,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto'
  },
  outline:{
    backgroundColor: 'white',
    borderColor: Colors.tint,
    borderWidth: 1,
  },
  text: {
    color: Colors.background,
    fontSize: 16,
    fontFamily: 'Paperlogy'
  },
});

export default ButtonCustom;
