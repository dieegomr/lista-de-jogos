import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './pages/AuthenticationPage';
import MainPage from './pages/MainPage';
import GameList from './components/GameList';
import { useState } from 'react';
import { GamesProvider } from './contexts/gameContext/provider';
import { AuthProvider } from './contexts/authContext/provider';
import ProtectedRoute from './pages/ProtectedRoute';
import { SearchProvider } from './contexts/searchContext/provider';

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState('All');

  return (
    <SearchProvider>
      <AuthProvider>
        <GamesProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Navigate replace to="games" />} />
              <Route path="auth" element={<AuthenticationPage />} />
              <Route
                element={
                  <MainPage
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                  />
                }
              >
                <Route
                  path="games"
                  element={<GameList selectedGenre={selectedGenre} />}
                />

                <Route
                  path="favorites"
                  element={
                    <ProtectedRoute>
                      <p>favorites</p>
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route></Route>
            </Routes>
          </BrowserRouter>
        </GamesProvider>
      </AuthProvider>
    </SearchProvider>
  );
}
