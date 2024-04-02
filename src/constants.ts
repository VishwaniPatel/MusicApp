import {Track} from 'react-native-track-player';
export const playListData: Track[] = [
  {
    id: 1,
    title: 'Song 1',
    artist: 'Artist 1',
    album: 'Album 1',
    artwork: 'one.png',
    url: require('./assets/audio/one.mp3'),
  },
  {
    id: 2,
    title: 'Song 2',
    artist: 'Artist 2',
    album: 'Album 2',
    artwork: 'two.jpg',
    url: require('./assets/audio/two.mp3'),
  },
  {
    id: 3,
    title: 'Song 3',
    artist: 'Artist 3',
    album: 'Album 3',
    artwork: 'three.jpg',
    url: require('./assets/audio/three.mp3'),
  },
  {
    id: 4,
    title: 'Song 4',
    artist: 'Artist 4',
    album: 'Album 4',
    artwork: 'four.jpg',
    url: require('./assets/audio/four.mp3'),
  },
];
