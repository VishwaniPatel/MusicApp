import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {playListData} from '../constants';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';
// import Image from '../assets/images/';
import SystemSetting from 'react-native-system-setting';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();
  const [queue, setQueue] = useState([]);
  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.index);
        setTrack(playingTrack);
        break;
    }
  });
  // switch (event.type) {
  //   case Event.PlaybackActiveTrackChanged:
  //     if (
  //       // event.type === Event.PlaybackActiveTrackChanged &&
  //       event.index
  //       // != null
  //     ) {
  //       const track = await TrackPlayer.getTrack(event.index);
  //       // const {title} = track || {};
  //       setTrack(track);
  //     }
  // }

  const renderArtWork = (track: any) => {
    const img = track?.item?.artwork;
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {img ? (
            <Image style={styles.albumArtImg} source={{uri: img}} />
          ) : (
            <Text>No Image</Text>
          )}
        </View>
      </View>
    );
  };
  async function handleShuffle() {
    let queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);

    loadPlaylist();
  }
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
      />

      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter onShuffle={handleShuffle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default MusicPlayer;
