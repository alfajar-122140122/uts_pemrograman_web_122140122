const Footer = () => {
    const year = new Date().getFullYear();
    
    return (
      <footer className="bg-green-900 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© {year} Quran Verse Generator</p>
          <p className="text-sm mt-1">Created with love and respect</p>
        </div>
        <div className="text-red-500 font-bold text-3xl">Tailwind Jalan Nggak Nih?
        </div>
      </footer>
    );
  };
  
  export default Footer;