import { View, Text, StyleSheet, TextInput} from 'react-native';

export default function MeasureTextField() {

    return(
    <View style={styles.measureRow}>
        <View style={styles.measureNameWrapper}>
        <TextInput
            placeholder="Ex: Busto"
            style={styles.measureNameInput}
            placeholderTextColor="#838383"
        />
        </View>
        <View style={styles.measureValueWrapper}>
        <Text style={styles.verticalLine} />
        <TextInput
            placeholder="00"
            keyboardType="numeric"
            style={styles.measureValueInput}
            placeholderTextColor="#838383"
        />
        <Text style={styles.unit}>cm</Text>
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
    width: 40,
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
})