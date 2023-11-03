import Head from 'next/head';
import Header from '../../components/Header';
import Playlist from '../../components/Playlist';
import Player from '../../components/Player';
import SongDisplay from '../../components/SongDisplay';

const songs = [
  {
    title: 'Song 1',
    artist: 'Artist 1',
    url: '/song1.mp3', // Provide actual audio file URL
  },
  // Add more songs here
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Music Streaming App</title>
      </Head>

      <Header />
      <main className="container mx-auto mt-8 mb-20">
        <div className="flex flex-col">
          <Playlist songs={songs} type={"Popular"}/>
          <SongDisplay songs={songs} />
          <Playlist songs={songs} type={"My"}/>
        </div>
      </main>
      <Player className="z-10"/>
    </div>
  );
}
