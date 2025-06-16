import { useEffect, useState } from 'react';
import axios from 'axios';
import { Lightbulb } from 'lucide-react';

interface CachedFact {
  fact: string;
  date: string;
}

const FunFactWidget = () => {
  const [fact, setFact] = useState<string>('');

  useEffect(() => {
    const today = new Date().toDateString();
    const storedFact = localStorage.getItem('fun_fact');
    let cached: CachedFact | null = null;

    try {
      cached = storedFact ? JSON.parse(storedFact) : null;
    } catch (err) {
      console.error("Failed to parse cached fact:", err);
    }

    if (cached && cached.date === today) {
      setFact(cached.fact);
    } else {
      axios
        .get<{ text: string }>('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
        .then(res => {
          const newFact = res.data.text;
          setFact(newFact);
          const factToStore: CachedFact = { fact: newFact, date: today };
          localStorage.setItem('fun_fact', JSON.stringify(factToStore));
        })
        .catch(() => {
          setFact("Could not load a fact right now.");
        });
    }
  }, []);

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 rounded-2xl p-5 transition-all duration-300 hover:bg-slate-800/40">
      <div className="flex items-center gap-2 mb-2 text-blue-400">
        <Lightbulb className="w-5 h-5" />
        <span className="text-sm font-semibold">Did You Know?</span>
      </div>
      <p className="text-slate-200 text-sm leading-relaxed">
        {fact || 'Loading...'}
      </p>
    </div>
  );
};

export default FunFactWidget;
