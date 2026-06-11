import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Card from "./components/Card";
import Button from "./components/Button";
import Footer from "./components/Footer";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=12`,
      );
      setUserData(res.data);
    } catch (err) {
      setError("Failed to load images. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [index]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handlePrev = () => {
    if (index > 1) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    setIndex(index + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Simple Static Background - No Animations */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Simple Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      
      <div className="relative z-10 sticky top-0 backdrop-blur-md bg-black/50 border-b border-white/10">
        <div className="container mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Gallery
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Page {index} • {userData.length} images
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                type="prev"
                onClick={handlePrev}
                disabled={index === 1 || loading}
              />
              <Button type="next" onClick={handleNext} disabled={loading} />
            </div>
          </div>
        </div>
      </div>

     
      <div className="relative z-10 container mx-auto px-6 py-12">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={getData}
              className="mt-2 text-red-400 hover:text-red-300 underline text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {loading && userData.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-xl h-64 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userData.length > 0 ? (
              userData.map((elem) => <Card key={elem.id} elem={elem} />)
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-6xl mb-4 opacity-50">📷</div>
                <h3 className="text-xl text-gray-400">No images found</h3>
              </div>
            )}
          </div>
        )}

        {loading && userData.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-3 text-white text-sm">Loading...</p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default App;
