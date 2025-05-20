import { Text, StyleSheet } from "react-native";



export default function ErrorText({error}) {

    return(
        <>
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
        </>
    )

}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        width: '75%',
        marginTop: -20,
        marginBottom: 12,
        textAlign: 'left',
        fontFamily: 'Inter_500Medium',
        fontSize: 12
      },
});