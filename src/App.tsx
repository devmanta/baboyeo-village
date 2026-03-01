import './App.css';
import { useState, useEffect } from 'react';

function LanguageButton({
  language,
  currentLanguage,
  onClick,
  label,
}: {
  language: 'ko' | 'fr';
  currentLanguage: 'ko' | 'fr';
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px',
        fontSize: '12px',
        backgroundColor: currentLanguage === language ? '#333' : '#ddd',
        color: currentLanguage === language ? 'white' : '#333',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontFamily: "'Gamja Flower', sans-serif",
      }}
    >
      {label}
    </button>
  );
}

function App() {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [language, setLanguage] = useState<'ko' | 'fr'>('ko');

  const texts = {
    ko: `사랑해.

너를 처음 본 날부터
내 마음이 너로 가득 찼어.

모든 순간이 소중하고,
너와의 시간이 가장 아름다워.

영원히 함께하고 싶어. 💕`,
    fr: `Je t'aime.

Depuis le jour où je t'ai vu,
mon cœur s'est rempli de toi.

Chaque moment est précieux,
et le temps avec toi est le plus beau.

Je veux rester avec toi pour toujours. 💕`,
  };

  const footers = {
    ko: 'from 히진',
    fr: 'from heejin',
  };

  const fullText = texts[language];

  useEffect(() => {
    setDisplayedText('');
    setIsAnimating(true);
  }, [language]);

  useEffect(() => {
    if (!isAnimating) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isAnimating, fullText]);

  return (
    <div>
      <div className="flex justify-center gap-4">
        <LanguageButton
          language="ko"
          currentLanguage={language}
          onClick={() => setLanguage('ko')}
          label="한국어"
        />
        <LanguageButton
          language="fr"
          currentLanguage={language}
          onClick={() => setLanguage('fr')}
          label="프랑스어"
        />
      </div>

      <div>
        <h1
          className="text-sm text-center m-0 font-bold text-gray-700"
          style={{ fontFamily: "'Gamja Flower', sans-serif" }}
        >
          From VPL...
        </h1>
      </div>

      <div>
        <p
          style={{
            fontSize: '16px',
            color: '#333',
            whiteSpace: 'pre-wrap',
            fontFamily: "'Gamja Flower', sans-serif",
            fontWeight: '400',
            lineHeight: '1.5',
            margin: '0',
            wordBreak: 'keep-all',
            height: '200px',
          }}
        >
          {displayedText}
          {isAnimating && (
            <span
              style={{
                display: 'inline-block',
                width: '1px',
                height: '20px',
                backgroundColor: '#333',
                marginLeft: '2px',
                verticalAlign: 'text-bottom',
                animation: 'blink 1s infinite',
              }}
            ></span>
          )}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 12px',
          boxSizing: 'border-box',
          color: '#666',
          fontSize: '14px',
          fontFamily: "'Gamja Flower', sans-serif",
          flexShrink: 0,
        }}
      >
        <p style={{ margin: '0' }}>{footers[language]}</p>
      </div>
    </div>
  );
}

export default App;
