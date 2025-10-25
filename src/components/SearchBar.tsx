import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const searchEngines = [
  {
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    icon: 'https://www.google.com/favicon.ico',
  },
  {
    name: 'Bing',
    url: 'https://www.bing.com/search?q=',
    icon: 'https://www.bing.com/favicon.ico',
  },
  {
    name: 'Brave',
    url: 'https://search.brave.com/search?q=',
    icon: 'https://brave.com/static-assets/images/brave-favicon.png',
  },
  {
    name: 'Opera',
    url: 'https://search.opera.com/search?q=',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Opera_2015_icon.svg/800px-Opera_2015_icon.svg.png',
  },
  {
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=',
    icon: 'https://duckduckgo.com/favicon.ico',
  },
];

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedEngine, setSelectedEngine] = useState(searchEngines[0]);
  const [showEngines, setShowEngines] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.open(`${selectedEngine.url}${encodeURIComponent(query)}`, '_blank');
    setQuery('');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowEngines(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-slate-800 border border-slate-600/50 rounded-xl relative z-30"
      >
        {/* Engine Selector */}
        <div
          ref={dropdownRef}
          className="relative flex items-center border-r border-slate-600/50 pl-3 pr-1 py-2"
        >
          <img
            src={selectedEngine.icon}
            alt={selectedEngine.name}
            className="w-5 h-5"
          />
          <button
            type="button"
            onClick={() => setShowEngines(!showEngines)}
            className="ml-1 p-2 hover:bg-slate-700/50 rounded"
          >
            <ChevronDown className="w-4 h-4 text-white" />
          </button>

          {showEngines && (
            <div className="absolute left-0 top-full mt-2 bg-slate-900 border border-slate-600 rounded-lg shadow-xl z-50 w-48">
              {searchEngines.map((engine) => (
                <button
                  key={engine.name}
                  type="button"
                  onClick={() => {
                    setSelectedEngine(engine);
                    setShowEngines(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-white hover:bg-slate-700"
                >
                  <img
                    src={engine.icon}
                    alt={engine.name}
                    className="w-5 h-5"
                  />
                  <span className="text-sm">{engine.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ALL HAIL RATIK"
          className="flex-1 bg-transparent px-4 py-3 text-white placeholder-slate-400 focus:outline-none"
        />

        {/* Search Button */}
        <button
          type="submit"
          className="p-4 border-l border-slate-600/50 hover:bg-blue-600/30 text-white"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
