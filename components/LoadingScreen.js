import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../hooks/useTheme';
  
export default function LoadingScreen({loading}) {
  const {colors} = useTheme()

  return loading ? (
    <View style={[styles.containerCentered, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={'#F0BC20'} />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  containerCentered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});