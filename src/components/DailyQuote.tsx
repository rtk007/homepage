import React, { useState, useEffect } from 'react';
import { RotateCcw, Quote } from 'lucide-react';

const quotes: { content: string; author: string }[] = [
   { content: "Self-belief and hard work will always earn you success.", author: "Virat Kohli" },
  { content: "You don’t play for the crowd. You play for the country.", author: "MS Dhoni" },
  { content: "Enjoy the game and chase your dreams. Dreams do come true.", author: "Sachin Tendulkar" },
  { content: "When people throw stones at you, you turn them into milestones.", author: "Sachin Tendulkar" },
  { content: "Leadership is about keeping your team together even in difficult times.", author: "Ricky Ponting" },
  { content: "The joy of doing well as a team is greater than any individual performance.", author: "Rahul Dravid" },
  { content: "I like people who don’t need everyone to like them.", author: "MS Dhoni" },
  { content: "Every morning you have two choices: continue to sleep with your dreams or wake up and chase them.", author: "K.L. Rahul" },
  { content: "Dream big, stay positive, work hard, and enjoy the journey.", author: "Yuvraj Singh" },
  { content: "There is no limit to what you can achieve, except the limits you place on your own thinking.", author: "Brian Lara" },

  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { content: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { content: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { content: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
  { content: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { content: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { content: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },

  { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { content: "Great things never come from comfort zones.", author: "Unknown" },
  { content: "Dream is not that which you see while sleeping; it is something that does not let you sleep.", author: "A.P.J. Abdul Kalam" },
  { content: "Winners are not people who never fail, but people who never quit.", author: "Unknown" },
  { content: "It does not matter how slowly you go, as long as you do not stop.", author: "Confucius" },
  { content: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { content: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
  { content: "Act as if what you do makes a difference. It does.", author: "William James" },
  { content: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { content: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },

  { content: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
  { content: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
  { content: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
  { content: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn" },
  { content: "Believe in yourself and all that you are.", author: "Christian D. Larson" },
  { content: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
  { content: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { content: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
  { content: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { content: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Unknown" },

  { content: "Don’t limit your challenges. Challenge your limits.", author: "Jerry Dunn" },
  { content: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
  { content: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { content: "I never dreamed about success. I worked for it.", author: "Estée Lauder" },
  { content: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats" },
  { content: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", author: "Eleanor Roosevelt" },
  { content: "To live a creative life, we must lose our fear of being wrong.", author: "Joseph Chilton Pearce" },
  { content: "Failure is not the opposite of success; it’s part of success.", author: "Arianna Huffington" },
  { content: "Go as far as you can see; when you get there, you’ll be able to see further.", author: "Thomas Carlyle" },
  { content: "Success doesn’t just find you. You have to go out and get it.", author: "Unknown" },

    { content: "Calm mind brings inner strength and self-confidence, so that's very important for good health.", author: "Dalai Lama" },
  { content: "Silence is a source of great strength.", author: "Lao Tzu" },
  { content: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
  { content: "The unexamined life is not worth living.", author: "Socrates" },
  { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { content: "Sometimes you win, sometimes you learn.", author: "John C. Maxwell" },
  { content: "If you want to go fast, go alone. If you want to go far, go together.", author: "African Proverb" },
  { content: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { content: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
  { content: "I never lose. I either win or learn.", author: "Nelson Mandela" },

  { content: "Success is a lousy teacher. It seduces smart people into thinking they can’t lose.", author: "Bill Gates" },
  { content: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates" },
  { content: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.", author: "Mark Zuckerberg" },
  { content: "Don’t worry about failure; you only have to be right once.", author: "Drew Houston (Dropbox)" },
  { content: "Make every detail perfect and limit the number of details to perfect.", author: "Jack Dorsey (Twitter)" },
  { content: "It’s not about ideas. It’s about making ideas happen.", author: "Scott Belsky (Behance)" },
  { content: "Risk more than others think is safe. Dream more than others think is practical.", author: "Howard Schultz (Starbucks)" },
  { content: "You can’t connect the dots looking forward; you can only connect them looking backward.", author: "Steve Jobs" },
  { content: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
  { content: "Don’t be distracted by criticism. Remember – the only taste of success some people get is to take a bite out of you.", author: "Zig Ziglar" },

  { content: "If you are born poor it's not your mistake, but if you die poor it's your mistake.", author: "Bill Gates" },
  { content: "Be so good they can’t ignore you.", author: "Steve Martin" },
  { content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { content: "Hustle until your haters ask if you’re hiring.", author: "Unknown" },
  { content: "The best revenge is massive success.", author: "Frank Sinatra" },
  { content: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
  { content: "It is not the mountain we conquer but ourselves.", author: "Edmund Hillary" },
  { content: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
  { content: "Champions keep playing until they get it right.", author: "Billie Jean King" },
  { content: "Winners embrace hard work. They love the discipline of it.", author: "Lou Holtz" },

  { content: "I've failed over and over and over again in my life and that is why I succeed.", author: "Michael Jordan" },
  { content: "I hated every minute of training, but I said, 'Don’t quit. Suffer now and live the rest of your life as a champion.'", author: "Muhammad Ali" },
  { content: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
  { content: "Do not pray for an easy life. Pray for the strength to endure a difficult one.", author: "Bruce Lee" },
  { content: "He who is not courageous enough to take risks will accomplish nothing in life.", author: "Muhammad Ali" },
  { content: "Talent wins games, but teamwork and intelligence win championships.", author: "Michael Jordan" },
  { content: "If you train hard, you’ll not only be hard, you’ll be hard to beat.", author: "Herschel Walker" },
  { content: "Champions aren’t made in gyms. They are made from something they have deep inside them.", author: "Muhammad Ali" },
  { content: "A true champion can adapt to anything.", author: "Floyd Mayweather" },
  { content: "You don’t get what you wish for. You get what you work for.", author: "Unknown" },

  { content: "You can have results or excuses, not both.", author: "Arnold Schwarzenegger" },
  { content: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee" },
  { content: "Life begins at the end of your comfort zone.", author: "Neale Donald Walsch" },
  { content: "Discipline equals freedom.", author: "Jocko Willink" },
  { content: "Clarity precedes success.", author: "Robin Sharma" },
  { content: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { content: "You attract what you are, not what you want.", author: "Unknown" },
  { content: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { content: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { content: "The mind is everything. What you think, you become.", author: "Buddha" }
];


const DailyQuote: React.FC = () => {
  const [quote, setQuote] = useState(quotes[0]);

  const fetchQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 col-span-2 h-[130px]">
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

      <div className="text-center">
        <p className="text-white text-lg mb-4 leading-relaxed italic">
          "{quote.content}"
          <p className="text-slate-400 text-sm font-medium">— {quote.author}</p>
        </p>
      </div>
    </div>
  );
};

export default DailyQuote;
