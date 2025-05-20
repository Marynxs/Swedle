import { Pressable, Text, StyleSheet, View } from 'react-native';


export default function RedirectText({text, link, onPress }) {
    return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {text}{' '}
        <Text style={styles.link} onPress={onPress}>
          {link}
        </Text>
      </Text>
    </View>
    );
  }

  const styles = StyleSheet.create({
    container:{
        width:'75%',
        marginBottom: 50
    },
    text: {
      color: '#000',
      fontSize: 13,
      fontFamily: 'Inter_500Medium'
    },
    link: {
        color:'#000',
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