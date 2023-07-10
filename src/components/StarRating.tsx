import { useState } from 'react';
import Star from './Star';
import { useRatedGames } from '../contexts/ratedGamesContext/hook';
import { useAuth } from '../contexts/authContext/hook';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const starContainerStyle = {
  display: 'flex',
  gap: '4px',
};

interface StarRatingProps {
  maxRating: number;
  gameId: number;
}

export default function StarRating({ maxRating = 4, gameId }: StarRatingProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addRatedGame, getRate } = useRatedGames();
  const rate = getRate(gameId);
  const [rating, setRating] = useState(rate);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating: number) {
    if (!isAuthenticated) {
      alert('voce precisa estar logado');
      navigate('/auth');
    } else {
      const ratedGame = { gameId: gameId, rate: rating };
      addRatedGame(ratedGame);
      setRating(rating);
    }
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {isAuthenticated &&
          Array.from({ length: maxRating }, (_, i) => (
            <Star
              key={i}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onRate={() => handleRating(i + 1)}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
            />
          ))}
        {!isAuthenticated &&
          Array.from({ length: maxRating }, (_, i) => (
            <Star
              key={i}
              full={tempRating >= i + 1}
              onRate={() => handleRating(i + 1)}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
            />
          ))}
      </div>
    </div>
  );
}
