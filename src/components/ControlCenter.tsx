import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {playbackService} from '../../musicPlayerServices';
import SystemSetting from 'react-native-system-setting';

const ControlCenter = ({onShuffle}: any) => {
  const playBackState = usePlaybackState();
  console.log(playBackState);

  // next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  // Previous button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack !== null) {
      if (playback.state == State.Paused || playback.state == State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          SystemSetting.getVolume().then((vol: number) => {
            SystemSetting.setVolume(vol - 0.1);
          });
        }}>
        <Icon style={styles.icon} name="remove" size={40} />
      </Pressable>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable onPress={() => togglePlayback(playBackState)}>
        <Icon
          style={styles.icon}
          name={playBackState.state == State.Playing ? 'pause' : 'play-arrow'}
          size={75}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
      <Pressable
        onPress={() => {
          SystemSetting.getVolume().then((vol: number) => {
            SystemSetting.setVolume(vol + 0.1);
          });
        }}>
        <Icon style={styles.icon} name="add" size={40} />
      </Pressable>
      <Pressable onPress={onShuffle}>
        <Icon style={styles.icon} name="shuffle" size={40} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

export default ControlCenter;
