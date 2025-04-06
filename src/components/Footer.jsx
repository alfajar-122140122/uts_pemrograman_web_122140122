const Footer = () => {
    const year = new Date().getFullYear();
    
    return (
      <footer className="bg-green-900 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© {year} Generator Ayat Al-Quran</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;