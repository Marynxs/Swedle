import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../hooks/useTheme';

export default function MeasureTextField({
  description,
  sizeCm,
  onChangeDescription,
  onChangeSizeCm,
  onDelete
}) {
  const {colors} = useTheme()

    return(
    <View style={styles.measureRow}>
        <View style={styles.measureNameWrapper}>
        <TextInput
            placeholder="Ex: Busto"
            style={[styles.measureNameInput , {color: colors.foreground}]}
            placeholderTextColor={colors.placeholder}
            value={description}
            onChangeText={onChangeDescription}
        />
        </View>
        <View style={styles.measureValueWrapper}>
        <Text style={styles.verticalLine} />
        <TextInput
            placeholder="00.0"
            keyboardType="numeric"
            style={[styles.measureValueInput, {color: colors.foreground}]}
            placeholderTextColor={colors.placeholder}
            value={sizeCm}
            onChangeText={onChangeSizeCm}
        />
        <Text style={[styles.unit, {color: colors.placeholder}]}>cm</Text>

        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Ionicons
            name="remove-circle-outline"
            size={24}
            color="#FF3B30"
          />
        </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    measureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,

  },
  measureNameWrapper: {
    flex: 1,
    justifyContent: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  measureNameInput: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    paddingVertical: 0,
    height: '100%',
    textAlignVertical: 'center',
  },
  measureValueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingRight: 4,
  },
  measureValueInput: {
    width: 50,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    paddingVertical: 0,
    height: '100%',
    textAlignVertical: 'center',
  },
  verticalLine: {
    width: 1,
    height: '40%',
    backgroundColor: '#ccc',
    marginRight: 4,
  },
  unit: {
    marginLeft: 6,
    fontFamily: 'Inter_400Regular',
    color: '#888',
    fontSize: 14
  },
  deleteButton:{
    paddingLeft: 10
  }
})