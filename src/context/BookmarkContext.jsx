import { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  bookmarks: [],
};

const ADD_BOOKMARK = 'ADD_BOOKMARK';
const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      if (state.bookmarks.some(bookmark => bookmark.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== action.payload),
      };
    default:
      return state;
  }
};

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const savedBookmarks = localStorage.getItem('quranBookmarks');
  const parsedBookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : initialState;
  
  const [state, dispatch] = useReducer(bookmarkReducer, parsedBookmarks);

  useEffect(() => {
    localStorage.setItem('quranBookmarks', JSON.stringify(state));
  }, [state]);

  const addBookmark = (verse) => {
    dispatch({
      type: ADD_BOOKMARK,
      payload: verse,
    });
  };

  const removeBookmark = (verseId) => {
    dispatch({
      type: REMOVE_BOOKMARK,
      payload: verseId,
    });
  };

  const isBookmarked = (verseId) => {
    return state.bookmarks.some(bookmark => bookmark.id === verseId);
  };

  return (
    <BookmarkContext.Provider value={{ 
      bookmarks: state.bookmarks, 
      addBookmark, 
      removeBookmark,
      isBookmarked
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

BookmarkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};