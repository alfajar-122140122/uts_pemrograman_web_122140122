import { memo } from 'react';
import PropTypes from 'prop-types';
import BookmarkButton from './BookmarkButton';

const VerseCard = ({ verse, detailed = false }) => {
  const arabicText = verse.text;
  const translation = verse.translation || 'Terjemahan tidak tersedia';
  const surahName = verse.surahName || 'Surah tidak diketahui';
  const surahNumber = verse.surahNumber || '0';
  const verseNumber = verse.numberInSurah || '0';
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-green-500">
      <div className="flex justify-between mb-4">
        <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Surat {surahName} ({surahNumber})
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded">
            Ayat {verseNumber}
          </span>
        </div>
        <BookmarkButton verse={verse} />
      </div>
      
      <div className="mb-4 text-right font-arabic text-2xl leading-loose">
        {arabicText}
      </div>
      
      <div className="text-gray-700">
        <p className="mb-2">{translation}</p>
        
        {detailed && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">Detail Tambahan</h4>
            <p className="text-sm text-gray-600">
              Ayat ini berasal dari Juz {verse.juz || 'tidak diketahui'}, halaman {verse.page || 'tidak diketahui'}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

VerseCard.propTypes = {
  verse: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    translation: PropTypes.string,
    surahName: PropTypes.string,
    surahNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numberInSurah: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    juz: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  detailed: PropTypes.bool,
};

// Use memo to prevent unnecessary re-renders
export default memo(VerseCard);