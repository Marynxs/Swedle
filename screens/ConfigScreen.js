import {View, Text, StyleSheet} from 'react-native';
import HeaderClientConfig from '../components/Header/HeaderClient&Config';

export default function ConfigScreen(){
    return(
        <View style={styles.container}> 
            
            <View styles={styles.header}>
                <HeaderClientConfig title='Configurações'/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#ffffff',
      },
      header: {
        flex: 0.1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20
      }
})

