import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { FontSize, Spacing } from '../../utils/sizes';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  const HistoryItem = ({ item, index }) => {
    return (
      <Text style={Styles.historyitem(item.status)}>
        {JSON.stringify(item.subject)}
      </Text>
    );
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={Styles.title}>Things to focus on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={Styles.clearContainer}>
          <RoundedButton
            title={'Clear'}
            size={75}
            onPress={() => {
              onClear();
            }}
          />
        </View>
          </>
        )}
        
      </SafeAreaView>
    </>
  );
};

const Styles = StyleSheet.create({
  historyitem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: FontSize.xl,
  }),

  title: {
    color: 'white',
    fontSize: FontSize.xxl,
  },

  clearContainer: {
    alignItems: 'center',
    padding: Spacing.md,
  },
});
