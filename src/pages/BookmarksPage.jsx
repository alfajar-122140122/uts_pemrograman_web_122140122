import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VerseCard from '../components/VerseCard';
import { useBookmarks } from '../context/BookmarkContext';

const BookmarksPage = () => {
  const { bookmarks } = useBookmarks();
  const [sortBy, setSortBy] = useState('date'); // 'date', 'surah'

  // Sort bookmarks based on selection
  const sortedBookmarks = useMemo(() => {
    if (sortBy === 'surah') {
      return [...bookmarks].sort((a, b) => {
        if (a.surahNumber !== b.surahNumber) {
          return a.surahNumber - b.surahNumber;
        }
        return a.numberInSurah - b.numberInSurah;
      });
    }
    // By default, return in the order they were added (most recent first)
    return [...bookmarks].reverse();
  }, [bookmarks, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Quran Verse Generator" />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Your Bookmarked Verses
            </h2>
            
            {bookmarks.length > 0 ? (
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  You have {bookmarks.length} bookmarked verses
                </p>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-700">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="date">Most Recent</option>
                    <option value="surah">Surah Order</option>
                  </select>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">
                You haven't bookmarked any verses yet. Navigate to verses and use the bookmark icon to save them here.
              </p>
            )}
          </div>

          <div className="space-y-6">
            {sortedBookmarks.map((verse) => (
              <VerseCard key={verse.id} verse={verse} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookmarksPage;