import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Quran Verse Generator" />
      
      <main className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-6xl font-bold text-green-800 mb-4">404</h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h3>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;