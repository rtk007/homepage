import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sun, CloudRain, CloudSnow, Cloud } from 'lucide-react';

interface WeatherData {
  temp: number;
  description: string;
  condition: string;
  city: string;
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
       const apiKey: string = import.meta.env.VITE_API_KEY;//ur api key

        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`
          );

          const data = res.data;
          setWeather({
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            condition: data.weather[0].main.toLowerCase(),
            city: data.name,
          });
        } catch {
          setError('Unable to fetch weather');
        }
      },
      () => setError('Location permission denied')
    );
  }, []);

  const getIcon = (condition: string) => {
    const size = 28;
    if (condition.includes('rain')) return <CloudRain size={size} className="text-blue-400" />;
    if (condition.includes('snow')) return <CloudSnow size={size} className="text-cyan-200" />;
    if (condition.includes('clear')) return <Sun size={size} className="text-yellow-400" />;
    return <Cloud size={size} className="text-slate-300" />;
  };

  return (
    <div className="bg-slate-800/30 text-slate-100 rounded-2xl px-5 py-4 border border-slate-700/50 hover:border-slate-600/50 transition-all max-w-sm shadow-md">
      {weather ? (
        <>
          <div className="flex items-center gap-3 text-xl font-semibold">
            {getIcon(weather.condition)}
            <span>{weather.temp}°C</span>
          </div>
          <div className="text-slate-400 text-sm mt-1">
            {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)} in {weather.city}
          </div>
        </>
      ) : (
        <div className="text-slate-400 text-sm">{error || 'Loading weather...'}</div>
      )}
    </div>
  );
};

export default Weather;
