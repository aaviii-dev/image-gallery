import { useState } from "react";

const Card = ({ elem }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors duration-200">
      <a
        href={elem.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="h-64 overflow-hidden bg-gray-800">
          {!imageError ? (
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src={elem.download_url}
              alt={elem.author}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500">Failed to load</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h2 className="text-white text-sm font-medium truncate">
            {elem.author}
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            ID: {elem.id.slice(0, 6)}
          </p>
        </div>
      </a>
    </div>
  );
};

export default Card;
