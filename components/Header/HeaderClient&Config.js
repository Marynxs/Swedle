import {Text, StyleSheet} from 'react-native';

export default function HeaderClientConfig(props){
    return(
        <Text style={styles.title}>{props.title}</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'Inter_500Medium',
        color: '#323232'
      }
})