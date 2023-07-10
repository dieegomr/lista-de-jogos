import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './pages/AuthenticationPage';
import MainPage from './pages/MainPage';
import GameList from './components/GameList';
import { GamesProvider } from './contexts/gameContext/provider';
import { AuthProvider } from './contexts/authContext/provider';
import ProtectedRoute from './pages/ProtectedRoute';
import { SearchProvider } from './contexts/searchContext/provider';
import { FavoritesProvider } from './contexts/favoritesContext/provider';
import FavoriteGamesList from './components/FavoriteGamesList';

export default function App() {
  return (
    <SearchProvider>
      <AuthProvider>
        <GamesProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<Navigate replace to="games" />} />
                <Route path="auth" element={<AuthenticationPage />} />
                <Route element={<MainPage />}>
                  <Route path="games" element={<GameList />} />
                  <Route
                    path="favorites"
                    element={
                      <ProtectedRoute>
                        <FavoriteGamesList />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route></Route>
              </Routes>
            </BrowserRouter>
          </FavoritesProvider>
        </GamesProvider>
      </AuthProvider>
    </SearchProvider>
  );
}
