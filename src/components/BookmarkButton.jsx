import PropTypes from 'prop-types';
import { useBookmarks } from '../context/BookmarkContext';

const BookmarkButton = ({ verse }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(verse.id);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(verse.id);
    } else {
      addBookmark(verse);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 ${
        bookmarked ? 'text-yellow-500' : 'text-gray-400'
      }`}
      aria-label={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill={bookmarked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
};

BookmarkButton.propTypes = {
  verse: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookmarkButton;