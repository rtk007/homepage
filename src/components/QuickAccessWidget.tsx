import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

interface QuickItem {
  name: string;
  url: string;
  icon: JSX.Element | string;
  color: string;
  isImageIcon?: boolean;
}

const mainShortcuts: QuickItem[] = [
  { name: 'LeetCode', url: 'https://leetcode.com/problemset/', icon: 'https://avatars.githubusercontent.com/u/41718343?s=280&v=4', color: '', isImageIcon: true },
  { name: 'GeeksforGeeks', url: 'https://geeksforgeeks.org', icon: 'https://play-lh.googleusercontent.com/ZI21NMObsjB7DbPU_EXRymHJL3HQpfsrB2N4CWb-diXm4xjl_13mmetYQZvcpgGf-64', color: '', isImageIcon: true },
  { name: 'Striver Sheets', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', icon: 'https://yt3.googleusercontent.com/ytc/AIdro_mdPFTT7VuJHQkvzW9gjJxvSV3bBDpEVNw8dWOmHjTT5g=s900-c-k-c0x00ffffff-no-rj', color: '', isImageIcon: true },
  { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'https://static.vecteezy.com/system/resources/previews/021/059/825/non_2x/chatgpt-logo-chat-gpt-icon-on-green-background-free-vector.jpg', color: '', isImageIcon: true },
  { name: 'GitHub', url: 'https://github.com', icon: 'https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png', color: '', isImageIcon: true },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'https://pngimg.com/uploads/linkedIn/linkedIn_PNG26.png', color: '', isImageIcon: true },
  { name: 'Canva', url: 'https://canva.com', icon: 'https://static.canva.com/static/images/favicon-1.ico', color: '', isImageIcon: true },
  { name: 'IamNEO', url: 'https://placement.skcet.ac.in', icon: 'https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/pvsx2nwkbl4wyb1yzgfa', color: '', isImageIcon: true },
  { name: 'Amypo', url: 'https://skcet.amypo.com', icon: 'https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/pvsx2nwkbl4wyb1yzgfa', color: '', isImageIcon: true },
  { name: 'YouTube', url: 'https://youtube.com', icon: 'https://static.vecteezy.com/system/resources/previews/023/986/704/non_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png', color: '', isImageIcon: true },
  { name: 'Netflix', url: 'hhttps://www.netflix.com/browse', icon: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg', color: '', isImageIcon: true },
  { name: 'JioHotstar', url: 'https://www.hotstar.com', icon: 'https://play-lh.googleusercontent.com/bp4jknyVZ8yDKhER9thIS1p9MBeU2LABqBX-sO8uaL1h5_keqlgMUmXv-CjfRWaqKw', color: '', isImageIcon: true },
  { name: 'Google Apps', url: '#', icon: 'https://images.icon-icons.com/2717/PNG/512/dots_nine_icon_173868.png', color: '', isImageIcon: true },];

const googleApps: QuickItem[] = [
  { name: 'Gmail', url: 'https://mail.google.com', icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico', color: '', isImageIcon: true },
  { name: 'Drive', url: 'https://drive.google.com', icon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png', color: '', isImageIcon: true },
  { name: 'Docs', url: 'https://docs.google.com', icon: 'https://ssl.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png', color: '', isImageIcon: true },
  { name: 'Sheets', url: 'https://sheets.google.com', icon: 'https://ssl.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png', color: '', isImageIcon: true },
  { name: 'Slides', url: 'https://slides.google.com', icon: 'https://ssl.gstatic.com/images/branding/product/1x/slides_2020q4_48dp.png', color: '', isImageIcon: true },
  { name: 'Meet', url: 'https://meet.google.com', icon: 'https://ssl.gstatic.com/images/branding/product/1x/meet_2020q4_48dp.png', color: '', isImageIcon: true },
  { name: 'Calendar', url: 'https://calendar.google.com', icon: 'https://ssl.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png', color: '', isImageIcon: true },
  { name: 'Photos', url: 'https://photos.google.com', icon: 'https://ssl.gstatic.com/images/branding/product/2x/photos_96dp.png', color: '', isImageIcon: true },
  { name: 'Maps', url: 'https://maps.google.com', icon: 'https://avatars.githubusercontent.com/u/3717923?s=200&v=4', color: '', isImageIcon: true },
  { name: 'News', url: 'https://news.google.com', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_News_icon.svg/1200px-Google_News_icon.svg.png', color: '', isImageIcon: true },
  { name: 'Translate', url: 'https://translate.google.com', icon: 'https://play-lh.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA', color: '', isImageIcon: true },
  { name: 'Tasks', url: 'https://tasks.google.com', icon: 'https://play-lh.googleusercontent.com/pjUulZ-Vdo7qPKxk3IRhnk8SORPlgSydSyYEjm7fGcoXO8wDyYisWXwQqEjMryZ_sqK2=w240-h480-rw', color: '', isImageIcon: true },
  { name: 'Forms', url: 'https://forms.google.com', icon: 'https://ssl.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png', color: '', isImageIcon: true },
  { name: 'Classroom', url: 'https://classroom.google.com', icon: 'https://icon2.cleanpng.com/20180331/vpw/avciis8vy.webp', color: '', isImageIcon: true },
];

const QuickAccessWidget: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [googleAppsIdx, setGoogleAppsIdx] = useState(0);
  const [showGoogleApps, setShowGoogleApps] = useState(false);

  const googleAppsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        googleAppsRef.current &&
        !googleAppsRef.current.contains(event.target as Node)
      ) {
        setShowGoogleApps(false);
      }
    };

    if (showGoogleApps) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGoogleApps]);

  const visible = mainShortcuts.slice(idx, idx + 4);
  const visibleGoogleApps = googleApps.slice(googleAppsIdx, googleAppsIdx + 5);

  const handlePrev = () => {
    setIdx((prevIdx) => (prevIdx === 0 ? mainShortcuts.length - 4 : prevIdx - 1));
  };

  const handleNext = () => {
    setIdx((prevIdx) => (prevIdx + 4 >= mainShortcuts.length ? 0 : prevIdx + 1));
  };

  const handleGoogleAppsPrev = () => {
    setGoogleAppsIdx((prevIdx) => (prevIdx === 0 ? googleApps.length - 5 : prevIdx - 1));
  };

  const handleGoogleAppsNext = () => {
    setGoogleAppsIdx((prevIdx) => (prevIdx + 5 >= googleApps.length ? 0 : prevIdx + 1));
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white font-medium">Quick Access</span>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={handlePrev} className="p-2 hover:bg-slate-700/30 rounded-full transition">
          <AiOutlineLeft className="w-5 h-5 text-slate-300" />
        </button>

        <div className="grid grid-cols-4 gap-3 flex-1">
          {visible.map((item, i) => (
            <a
              key={i + idx}
              href={item.name === 'Google Apps' ? '#' : item.url}
              onClick={item.name === 'Google Apps' ? () => setShowGoogleApps(!showGoogleApps) : undefined}
              target={item.name === 'Google Apps' ? undefined : "_blank"}
              rel={item.name === 'Google Apps' ? undefined : "noopener noreferrer"}
              className="group flex flex-col items-center p-3 rounded-xl hover:bg-slate-700/30 transition transform"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition overflow-hidden">
                <img src={item.icon as string} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <span className="text-slate-300 text-xs group-hover:text-white transition">
                {item.name}
              </span>
            </a>
          ))}
        </div>

        <button onClick={handleNext} className="p-2 hover:bg-slate-700/30 rounded-full transition">
          <AiOutlineRight className="w-5 h-5 text-slate-300" />
        </button>
      </div>

      {showGoogleApps && (
        <div ref={googleAppsRef} className="mt-4 bg-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <button onClick={handleGoogleAppsPrev} className="p-2 hover:bg-slate-600 rounded-full transition">
              <AiOutlineLeft className="w-5 h-5 text-slate-300" />
            </button>

            <div className="grid grid-cols-5 gap-3 flex-1 transition-all duration-300 transform">
              {visibleGoogleApps.map((app, i) => (
                <a
                  key={i + googleAppsIdx}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-slate-600 transition transform hover:scale-105"
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-2">
                    <img src={app.icon as string} alt={app.name} className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-slate-200 text-xs text-center min-h-[1rem]">{app.name}</span>
                </a>
              ))}
            </div>

            <button onClick={handleGoogleAppsNext} className="p-2 hover:bg-slate-600 rounded-full transition">
              <AiOutlineRight className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickAccessWidget;
