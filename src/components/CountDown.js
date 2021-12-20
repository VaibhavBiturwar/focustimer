import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { FontSize, Spacing } from '../utils/sizes';

const millisToMinutes = (mins) => mins * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes = .1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft/millisToMinutes(minutes));
      return timeLeft;
    });
  };

  useEffect( ()=>{
    setMillis(millisToMinutes(minutes));
  }, [minutes])

  useEffect(() => {
    if(isPaused){
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const [millis, setMillis] = useState(millisToMinutes(minutes));
  const showMinutes = Math.floor(millis / 1000 / 60) % 60;
  const showSeconds = Math.floor(millis / 1000) % 60;
  return (
    <View style={styles.timerContainer}>
      <Text style={styles.text}>
        {formatTime(showMinutes)} : {formatTime(showSeconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: FontSize.xxxl,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  timerContainer: {
    backgroundColor: 'rgba(201, 10, 198 , 0.3)',
    padding: Spacing.md,
    margin: Spacing.lg,
  },
});
