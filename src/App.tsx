import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './pages/AuthenticationPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="games" />} />
        <Route path="auth" element={<AuthenticationPage />} />
        <Route path="games" element={<p>games</p>} />
        <Route path="favorites" element={<p>favorites</p>} />
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}
