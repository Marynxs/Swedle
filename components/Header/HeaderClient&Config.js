import {Text, StyleSheet} from 'react-native';

import { useTheme } from '../../context/hooks/useTheme';

export default function HeaderClientConfig(props){
    const {colors} = useTheme()
    return(
        <>
        <Text style={[styles.text, {color: colors.foreground}]}>{props.title}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontFamily: 'Inter_500Medium',
      }
})