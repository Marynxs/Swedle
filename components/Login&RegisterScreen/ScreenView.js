import React from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/hooks/useTheme';

export default function ScreenView({ children }) {
  const {colors} = useTheme()

  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      contentContainerStyle={[styles.container , { backgroundColor: colors.background }]}
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
  },
  scrollView: {
    flex: 1,
  },
});
