import { useState, useEffect, useCallback } from 'react';
import { getRandomVerse } from '../services/api';

const useVerse = () => {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomVerse = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRandomVerse();
      setVerse(data);
    } catch (err) {
      setError('Failed to fetch verse. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomVerse();
  }, [fetchRandomVerse]);

  return { verse, loading, error, fetchRandomVerse };
};

export default useVerse;