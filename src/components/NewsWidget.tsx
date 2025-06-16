import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';

interface NewsItem {
  title: string;
  url: string;
  source: string;
  date: string;
}

const NewsWidget: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('Open Source');
  const [loading, setLoading] = useState(true);

  const categories = ['Open Source', 'Web Dev', 'AI', 'Cloud'];

  useEffect(() => {
    fetchNews(activeCategory);
  }, [activeCategory]);

  const fetchNews = async (category: string) => {
    setLoading(true);
    try {
      const tag = category.toLowerCase().replace(' ', '');
      const res = await fetch(`https://dev.to/api/articles?tag=${tag}&per_page=5`);
      const data = await res.json();
      const formattedNews = data.map((item: any) => ({
        title: item.title,
        url: item.url,
        source: 'Dev.to',
        date: item.published_at.slice(0, 10),
      }));
      setNews(formattedNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <Newspaper className="w-5 h-5 text-blue-400" />
        <span className="text-white font-medium">TECH News</span>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto scrollbar-hide">
          {news.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-start gap-3">
                <ExternalLink className="w-4 h-4 text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium leading-relaxed group-hover:text-blue-300 transition-colors mb-1">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsWidget;