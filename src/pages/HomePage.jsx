import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VerseCard from '../components/VerseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import useVerse from '../hooks/useVerse';
import { searchVerses } from '../services/api';

const HomePage = () => {
  const { verse, loading, error, fetchRandomVerse } = useVerse();
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (query) => {
    try {
      setSearchLoading(true);
      const response = await searchVerses(query);
      
      const formattedResults = response.data.matches.map(match => ({
        id: `${match.surah.number}:${match.numberInSurah}`,
        text: match.text,
        translation: match.translation || match.text,
        surahName: match.surah.englishName,
        surahNumber: match.surah.number,
        numberInSurah: match.numberInSurah,
      }));
      
      setSearchResults(formattedResults);
      setSearchError(null);
    } catch (err) {
      setSearchError('Failed to search verses. Please try again.');
      console.error(err);
    } finally {
      setSearchLoading(false);
    }
  };

  const formattedVerse = useMemo(() => {
    if (!verse || !verse.data) return null;

    const arabicAyah = verse.data[0];
    const translationAyah = verse.data[1];

    return {
      id: `${arabicAyah.surah.number}:${arabicAyah.numberInSurah}`,
      text: arabicAyah.text,
      translation: translationAyah.text,
      surahName: arabicAyah.surah.englishName,
      surahNumber: arabicAyah.surah.number,
      numberInSurah: arabicAyah.numberInSurah,
      juz: arabicAyah.juz,
      page: arabicAyah.page,
    };
  }, [verse]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Generator Ayat Al-Quran" />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Apa Ayat Al-Quran Mu Hari Ini?
            </h2>
            <p className="text-gray-600 mb-6">
              Jelajahi Ayat-Ayat Al-Quran
            </p>
            
            <button
              onClick={fetchRandomVerse}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Generate Ayat
            </button>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : formattedVerse && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Hasil Generate Ayat</h3>
              <VerseCard verse={formattedVerse} detailed={true} />
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Cari Ayat</h3>
            <SearchBar onSearch={handleSearch} />
            
            {searchLoading ? (
              <LoadingSpinner />
            ) : searchError ? (
              <ErrorMessage message={searchError} />
            ) : searchResults.length > 0 ? (
              <div>
                <p className="mb-4 text-gray-600">Found {searchResults.length} results</p>
                {searchResults.map((result) => (
                  <VerseCard key={result.id} verse={result} />
                ))}
              </div>
            ) : searchResults.length === 0 && !searchLoading && !searchError ? (
              <p className="text-gray-500 text-center py-4">Tidak ada hasil pencarian untuk ditampilkan</p>
            ) : null}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;