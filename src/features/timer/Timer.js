import React, { useState } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Vibration,
  Plateform,
} from 'react-native';
import { Spacing } from '../../utils/sizes';
import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [currentButtonState, setCurrentButtonState] = useState('Start');
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const changeButtonStatus = () => {
    if (isStarted) {
      setCurrentButtonState('Start');
      setIsStarted(false);
    } else {
      setCurrentButtonState('Pause');
      setIsStarted(true);
    }
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS == 'ios') {
      const interval = setInterval(() => Vibration.vibrate, 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };


  return (
    <View style={Styles.container}>
      <View style={Styles.countdownContainer}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={Styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View>
        <Text style={Styles.title}>We are Focusing on </Text>
        <Text style={Styles.focusSubject}>{focusSubject}</Text>
        <View style={{ margin: 20 }}>
          <ProgressBar progress={progress} color={'#98FF86'} />
        </View>
      </View>
      <View style={Styles.buttonWrapper}>
        <RoundedButton
          title={currentButtonState}
          fontSize={50}
          onPress={changeButtonStatus}
        />
      </View>
      <View style={Styles.clearButton}>
        <RoundedButton
          title={"-"}
          fontSize={70}
          onPress={()=>clearSubject()}
          size={40}
        />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container:{
    flex:1
  },
  
  title: {
    fontSize: Spacing.xl,
    color: 'white',
    textAlign: 'center',
  },

  focusSubject: {
    fontSize: Spacing.xxl,
    color: 'white',
    textAlign: 'center',
  },

  countdownContainer: {
    flex:0.4,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearButton:{
    paddingLeft:10,
    paddingBottom:10
  }

});
