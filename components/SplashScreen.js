import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

const splashScreen = require('../assets/SplashScreen.mp4')

export default function SplashScreen({ onVideoEnd }) {
  const player = useVideoPlayer(splashScreen,(player) => {
    player.loop = false
    player.play()
  })

    useEffect(() => {
    const subscription = player.addListener('playToEnd', () => {
        if (onVideoEnd) {
        onVideoEnd();
        }
    });

    return () => {
        subscription.remove(); 
    };
    }, [player, onVideoEnd]);

  return (
    <View style={styles.container}>
      <VideoView
        player={player} style={{width:300, height:300}}
        nativeControls={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F0BC20',
    justifyContent:'center',
    alignItems:'center'
  },
});
