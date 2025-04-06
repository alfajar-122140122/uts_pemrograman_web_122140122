const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        <p className="ml-4 text-green-700">Loading Ayat...</p>
      </div>
    );
  };
  
  export default LoadingSpinner;