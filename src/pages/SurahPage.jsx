import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VerseCard from '../components/VerseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getSurah } from '../services/api';

const SurahPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch surah data
  const fetchSurah = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate surah number
      const surahNum = parseInt(surahNumber);
      if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
        navigate('/not-found');
        return;
      }
      
      const response = await getSurah(surahNum);
      setSurah(response);
    } catch (err) {
      setError('Gagal mengambil data surah. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [surahNumber, navigate]);

  useEffect(() => {
    fetchSurah();
  }, [fetchSurah]);

  // Format verses for display
  const formatVerses = () => {
    if (!surah || !surah.data || !surah.data[0] || !surah.data[1]) return [];
    
    const arabicEdition = surah.data[0];
    const translationEdition = surah.data[1];
    
    return arabicEdition.ayahs.map((ayah, index) => ({
      id: `${arabicEdition.number}:${ayah.numberInSurah}`,
      text: ayah.text,
      translation: translationEdition.ayahs[index]?.text || 'Terjemahan tidak tersedia',
      surahName: arabicEdition.englishName,
      surahNumber: arabicEdition.number,
      numberInSurah: ayah.numberInSurah,
    }));
  };

  const formattedVerses = surah ? formatVerses() : [];
  const surahInfo = surah?.data?.[0];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Generator Ayat Al-Quran" />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : surahInfo ? (
            <>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-green-800 mb-2">
                  Surah {surahInfo.englishName}
                </h2>
                <p className="text-lg text-gray-600 mb-1">
                  {surahInfo.englishNameTranslation}
                </p>
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                  <span>Jumlah Ayat: {surahInfo.numberOfAyahs}</span>
                  <span>Wahyu: {surahInfo.revelationType === 'Meccan' ? 'Makkiyah' : 'Madaniyah'}</span>
                </div>
              </div>

              <div className="space-y-6">
                {formattedVerses.map((verse) => (
                  <VerseCard key={verse.id} verse={verse} />
                ))}
              </div>

              <div className="flex justify-between mt-8">
                {parseInt(surahNumber) > 1 && (
                  <button
                    onClick={() => navigate(`/surah/${parseInt(surahNumber) - 1}`)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Surah Sebelumnya
                  </button>
                )}
                
                {parseInt(surahNumber) < 114 && (
                  <button
                    onClick={() => navigate(`/surah/${parseInt(surahNumber) + 1}`)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-auto"
                  >
                    Surah Berikutnya
                  </button>
                )}
              </div>
            </>
          ) : (
            <p>Data tidak tersedia</p>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SurahPage;