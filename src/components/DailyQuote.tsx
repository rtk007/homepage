import React, { useState, useEffect } from 'react';
import { RotateCcw, Quote } from 'lucide-react';

interface QuoteData {
  content: string;
  author: string;
}

const DailyQuote: React.FC = () => {
  const [quote, setQuote] = useState<QuoteData>({ content: '', author: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
  setLoading(true);
  try {
    const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'));
    const result = await response.json();
    const data = JSON.parse(result.contents); // parse the JSON inside the string
    setQuote({ content: data[0].q, author: data[0].a });
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    setQuote({ content: "Unable to fetch quote right now.", author: "System" });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 col-span-2 h-[130px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-blue-400">
          <Quote className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wide uppercase">Inspiration of the Day</span>
        </div>
        <button
          onClick={fetchQuote}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
          title="New Quote"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          <div className="h-3 bg-slate-700 rounded w-1/3"></div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-white text-lg mb-4 leading-relaxed italic">"{quote.content}"<p className="text-slate-400 text-sm font-medium">
            — {quote.author}</p></p>
          
        </div>
      )}
    </div>
  );
};

export default DailyQuote;