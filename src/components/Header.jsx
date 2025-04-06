import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ title }) => {
  return (
    <header className="bg-green-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-green-300">Home</Link></li>
            <li><Link to="/surah/1" className="hover:text-green-300">Surah</Link></li>
            <li><Link to="/bookmarks" className="hover:text-green-300">Bookmarks</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;