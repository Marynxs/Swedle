import React from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ScreenView({ children }) {
  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraScrollHeight={50}
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.screen}>
        {children}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,          
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  screen: {
    flexGrow: 1,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',   
  },
});
