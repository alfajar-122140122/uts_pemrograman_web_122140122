import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookmarkProvider } from './context/BookmarkContext';
import HomePage from './pages/HomePage';
import SurahPage from './pages/SurahPage';
import BookmarksPage from './pages/BookmarksPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BookmarkProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/surah/:surahNumber" element={<SurahPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </BookmarkProvider>
  );
}

export default App;