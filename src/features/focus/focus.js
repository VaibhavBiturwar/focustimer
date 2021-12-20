import React,{useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import{ FontSize,Spacing} from '../../utils/sizes';
// You can import from local files

// or any pure javascript modules available in npm

export const Focus = ({ addSubject }) => {
  const [subject , setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on ?</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: Spacing.md }}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}></TextInput>
          <RoundedButton
            title="+"
            size={50}
            onPress={() => {addSubject(subject)}}></RoundedButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: 'center',
    padding: Spacing.md,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: FontSize.xl,
  },
  inputContainer: {
    paddingTop: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
