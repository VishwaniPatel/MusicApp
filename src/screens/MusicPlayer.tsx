import React, {useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';

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

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();
  console.log('track', track);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    // switch (event.type) {
    //   case Event.PlaybackActiveTrackChanged:
    //     if (event.index) {
    //       const playingTrack = await TrackPlayer.getTrack(event.index);
    //       setTrack(playingTrack);
    //     }
    //     break;
    // }
    if (
      event.type === Event.PlaybackActiveTrackChanged &&
      event.index != null
    ) {
      const track = await TrackPlayer.getTrack(event.index);
      // const {title} = track || {};
      setTrack(track);
    }
  });

  const renderArtWork = (track: any) => {
    console.log('img', track.item.artwork);
    // const img = require(`../assets/images/${track.item.artwork}`);
    const img = `../assets/images/${'one.png'}`;
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {img && <Image style={styles.albumArtImg} source={require(img)} />}
        </View>
      </View>
    );
  };

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
      <ControlCenter />
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
