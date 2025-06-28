import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors.placeholderGreen} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default LoadingIndicator;