import { Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/hooks/useTheme';


export default function RedirectText({text, link, onPress }) {
    const {colors} = useTheme()

    return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: colors.redirectText}]}>
        {text}{' '}
        <Text style={[styles.link, {color: colors.redirectText}]} onPress={onPress}>
          {link}
        </Text>
      </Text>
    </View>
    );
  }

  const styles = StyleSheet.create({
    container:{
        width:'100%',
        marginBottom: 50
    },
    text: {
      fontSize: 13,
      fontFamily: 'Inter_500Medium'
    },
    link: {
        fontSize: 13,
        fontFamily: 'Inter_700Bold'
    },
        Texto: {
        width: 300, 
        height: 133, 
        resizeMode:'contain',
        marginBottom: 60
    }
  });  