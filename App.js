import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Focus } from './src/features/focus/focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Spacing } from './src/utils/sizes';
import { Timer } from './src/features/timer/Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// You can import from local files

// or any pure javascript modules available in npm

export default function App() {
  const [subject, setSubject] = useState();
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
      console.log('DATA SAVED' + JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const loadFocusHistory = async () => {
    try {
      console.log('Load Called');
      const History = await AsyncStorage.getItem('focusHistory');
      if (History && JSON.parse(History).length) {
        setFocusHistory(JSON.parse(History));
        console.log('Data Loaded');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  const Statuses = {
    COMPLETE: 1,
    CANCELED: 2,
  };

  return (
    <View style={styles.container}>
      {subject ? (
        <Timer
          focusSubject={subject}
          onTimerEnd={() => {
            {
              addFocusHistorySubjectWithState(subject, Statuses.COMPLETE);
              setSubject(null);
            }
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(subject, Statuses.CANCELED);
            setSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setSubject}></Focus>
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xxl,
    flex: 1,
    backgroundColor: '#e3b5eb',
  },
});
