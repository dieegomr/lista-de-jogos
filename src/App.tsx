import { useState } from 'react';

import Filter from './components/Filter';
import GameList from './components/GameList';
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Layout from './ui/Layout';

export default function App() {
  const games = [
    {
      id: 523,
      title: 'Fall Guys',
      thumbnail: 'https://www.freetogame.com/g/523/thumbnail.jpg',
      short_description:
        'Play the most competitive massively multiplayer party royale game featuring beans ever for free on a variety of platforms. ',
      game_url: 'https://www.freetogame.com/open/fall-guys',
      genre: 'Battle Royale',
      platform: 'PC (Windows)',
      publisher: 'Mediatonic',
      developer: 'Mediatonic',
      release_date: '2020-08-04',
      freetogame_profile_url: 'https://www.freetogame.com/fall-guys',
    },
    {
      id: 11,
      title: 'Neverwinter',
      thumbnail: 'https://www.freetogame.com/g/11/thumbnail.jpg',
      short_description:
        'A free-to-play 3D action MMORPG based on the acclaimed Dungeons & Dragons fantasy roleplaying game. ',
      game_url: 'https://www.freetogame.com/open/neverwinter',
      genre: 'MMORPG',
      platform: 'PC (Windows)',
      publisher: 'Perfect World Entertainment',
      developer: 'Cryptic Studios',
      release_date: '2013-12-06',
      freetogame_profile_url: 'https://www.freetogame.com/neverwinter',
    },
    {
      id: 515,
      title: 'Halo Infinite',
      thumbnail: 'https://www.freetogame.com/g/515/thumbnail.jpg',
      short_description:
        'For the first time ever, a free-to-play Halo experience is available in the form of Halo Infinite’s multiplayer.',
      game_url: 'https://www.freetogame.com/open/halo-infinite',
      genre: 'Shooter',
      platform: 'PC (Windows)',
      publisher: 'Xbox Game Studios',
      developer: '343 Industries',
      release_date: '2021-11-15',
      freetogame_profile_url: 'https://www.freetogame.com/halo-infinite',
    },
    {
      id: 511,
      title: 'Phantasy Star Online 2 New Genesis',
      thumbnail: 'https://www.freetogame.com/g/511/thumbnail.jpg',
      short_description:
        'The legacy of Phantasy Star Online 2 continues a thousand years later!',
      game_url: 'https://www.freetogame.com/open/pso2-new-genesis',
      genre: 'MMORPG',
      platform: 'PC (Windows)',
      publisher: 'Sega',
      developer: 'Sega',
      release_date: '2021-06-09',
      freetogame_profile_url: 'https://www.freetogame.com/pso2-new-genesis',
    },
    {
      id: 5,
      title: 'Crossout',
      thumbnail: 'https://www.freetogame.com/g/5/thumbnail.jpg',
      short_description: 'A post-apocalyptic MMO vehicle combat game! ',
      game_url: 'https://www.freetogame.com/open/crossout',
      genre: 'Shooter',
      platform: 'PC (Windows)',
      publisher: 'Targem',
      developer: 'Gaijin',
      release_date: '2017-05-30',
      freetogame_profile_url: 'https://www.freetogame.com/crossout',
    },
    {
      id: 9,
      title: 'World of Warships',
      thumbnail: 'https://www.freetogame.com/g/9/thumbnail.jpg',
      short_description:
        'A 3D free to play naval action-themed MMO from the creators of World of Tanks! ',
      game_url: 'https://www.freetogame.com/open/world-of-warships',
      genre: 'Shooter',
      platform: 'PC (Windows)',
      publisher: 'Wargaming',
      developer: 'Wargaming',
      release_date: '2015-07-02',
      freetogame_profile_url: 'https://www.freetogame.com/world-of-warships',
    },
    {
      id: 12,
      title: 'War Thunder',
      thumbnail: 'https://www.freetogame.com/g/12/thumbnail.jpg',
      short_description:
        'A MMO shooter that puts you in command of hundreds of the finest combat vehicles of World War II.',
      game_url: 'https://www.freetogame.com/open/war-thunder',
      genre: 'Shooter',
      platform: 'PC (Windows)',
      publisher: 'Gaijin Entertainment',
      developer: 'Gaijin Entertainment',
      release_date: '2013-08-15',
      freetogame_profile_url: 'https://www.freetogame.com/war-thunder',
    },
    {
      id: 2,
      title: 'World of Tanks',
      thumbnail: 'https://www.freetogame.com/g/2/thumbnail.jpg',
      short_description:
        'If you like blowing up tanks, with a quick and intense game style you will love this game!',
      game_url: 'https://www.freetogame.com/open/world-of-tanks',
      genre: 'Shooter',
      platform: 'PC (Windows)',
      publisher: 'Wargaming',
      developer: 'Wargaming',
      release_date: '2011-04-12',
      freetogame_profile_url: 'https://www.freetogame.com/world-of-tanks',
    },
    {
      id: 529,
      title: 'Tower of Fantasy',
      thumbnail: 'https://www.freetogame.com/g/529/thumbnail.jpg',
      short_description:
        'Tower of Fantasy is a 3D open-world RPG, anime-style sci-fi MMO RPG game with unique characters and beautiful open vistas!',
      game_url: 'https://www.freetogame.com/open/tower-of-fantasy',
      genre: 'MMORPG',
      platform: 'PC (Windows)',
      publisher: 'Level Infinite',
      developer: 'Hotta Studio',
      release_date: '2022-08-10',
      freetogame_profile_url: 'https://www.freetogame.com/tower-of-fantasy',
    },
    {
      id: 528,
      title: 'Noah’s Heart',
      thumbnail: 'https://www.freetogame.com/g/528/thumbnail.jpg',
      short_description:
        'Noah’s Heart is an open-world MMORPG game with a focus on exploration and socialization.',
      game_url: 'https://www.freetogame.com/open/noahs-heart',
      genre: 'MMORPG',
      platform: 'PC (Windows)',
      publisher: 'Archosaur Games',
      developer: 'Archosaur Games',
      release_date: '2022-07-28',
      freetogame_profile_url: 'https://www.freetogame.com/noahs-heart',
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <NavBar>
        <Logo />
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Filter games={games} />
      </NavBar>
      <GameList searchQuery={searchQuery} />
    </Layout>
  );
}
