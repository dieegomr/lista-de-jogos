import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './pages/AuthenticationPage';
import MainPage from './pages/MainPage';
import GameList from './components/GameList';
import { useState } from 'react';
import { GamesProvider } from './contexts/gameContext/provider';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  return (
    <GamesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="games" />} />
          <Route path="auth" element={<AuthenticationPage />} />
          <Route
            element={
              <MainPage
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
              />
            }
          >
            <Route
              path="games"
              element={
                <GameList
                  searchQuery={searchQuery}
                  selectedGenre={selectedGenre}
                />
              }
            />
            <Route path="favorites" element={<p>favorites</p>} />
          </Route>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </GamesProvider>
  );
}
