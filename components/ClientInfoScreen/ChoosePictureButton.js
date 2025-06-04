import { View, StyleSheet,TouchableOpacity, Image} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../hooks/useTheme';



export default function ChoosePictureButton({ onPress, uri }) {

    const {colors} = useTheme()
    return(
        <View style={styles.imageContainer}>
        <TouchableOpacity onPress={onPress}>
            {uri ? (<Image source={{ uri }} style={styles.profileImage} />) : (<Ionicons name="person-circle-outline" size={85} style={[styles.profileImage, {color:colors.profilePicker} ]}/>)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.editIcon} onPress={onPress}>
            <Feather name="camera" size={18} color="black#" />
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: '38%',
        backgroundColor: '#D9D9D9',
        borderRadius: 50,
        padding: 6
    },
})