import Clock from './components/Clock';
import DailyQuote from './components/DailyQuote';
import SearchBar from './components/SearchBar';
import NewsWidget from './components/NewsWidget';
import TodoList from './components/TodoList';
import QuickAccessWidget from './components/QuickAccessWidget';

import FunFactWidget from './components/FunFactWidget';
import SelfCareReminder from './components/SelfCareReminder';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="w-[98%] mx-auto">

        {/* Header */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Left Column - Clock + Weather + FunFact + YouTubeMusic */}
          <div className="space-y-4">
            <div className="bg-slate-800/40 rounded-xl p-2 text-center h-[300px]">
              <Clock />
            </div>

            

            <div className="bg-slate-800/40 rounded-xl p-4">
            {/* Inner scrollable section */}
            <div className="h-[280px] overflow-y-auto pr-2">
              <TodoList />
            </div>
          </div>

    
          </div>

          {/* Center - Quote + Search + Heading + Quick Access */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/60 p-2 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 mb-4">
              <DailyQuote />
            </div>

            <div className="text-center mb-8">
              <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
                  {(() => {
                    const hour = new Date().getHours()
                    if (hour < 12) return 'Good Morning,'
                    if (hour < 18) return 'Good Afternoon,'
                    return 'Good Evening,'
                  })()}
                <span className="bg-gradient-to-r from-cyan-300 via-pink-300 to-teal-300 bg-clip-text text-transparent">
                  <br/>
                  RATIK KRISHNA
                </span>
              </h1>
            </div>

            <SearchBar />
            <br />
            <QuickAccessWidget />
          </div>

          <div className="space-y-4">
          <div className="bg-slate-800/40 rounded-xl p-2 text-center">
              <FunFactWidget />
            </div>
          
          {/* Tech News Widget */}
          <div className="bg-slate-800/40 rounded-xl p-4 h-[350px]">
          <div className="h-full overflow-y-auto pr-2 scrollbar-hide">
            <NewsWidget />
          </div>
        </div>          <div className="bg-slate-800/40 rounded-xl p-2 text-center">
              <SelfCareReminder />
            </div>

        </div>

          

        </div>
      </div>
    </div>
  );
}

export default App;