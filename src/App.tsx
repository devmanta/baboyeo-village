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
        backgroundColor: currentLanguage === language ? 'salmon' : '#ddd',
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
    ko: `혀나 안녕? 아 옆에서 몰래?하느라 진짜 쫄렸다
도서관 서현아 왜이렇게 좋아? 흐아ㅏㅏㅏㅏ
너무,, 좋아,,,,,,, 하하하,,,,,,^.^ㅎㅎ,,,,,,
나 진짜 개발 감을 잃었다… 
이런거 진짜 30분컷이면 
fancy하게 만들어야하는데…..
빨리 서현아 저점매수 맨날 해야겠다 안되겠다
(진짜 내가 서현아 옆에서 계속 응원한다)
(필요한거 있음 말만해!!)
잠도 못잤는데 이렇게 열심히 공부도하고!!
너무 멋있잖아!!!!!!!!ㅠㅠ
이렇게 글썼는데 프랑스어 제대로 번역이 될지 의문이다
이번주도 혀나 덕분에 너무 잘보냈고
앞으로도 행복하자💕`,
    fr: `Hé Hyeona, coucou ! Ah, j'étais tellement stressée à faire ça en cachette à côté de toi 😂
Seohyeon à la bibliothèque, pourquoi t'es aussi bien ?! Ahhhhh
Je t'aime trop,,,,,, hahaha,,,,,, ^.^ hehe,,,,,,
J'ai vraiment perdu le feeling pour le dev…
Ce genre de truc, faudrait le faire en 30 minutes chrono et rendre ça fancy…..
Faut que j'achète Seohyeon au plus bas tous les jours, j'ai pas le choix
(Sérieux, je suis là à côté de toi à t'encourager en permanence)
(Si t'as besoin de quoi que ce soit, dis-le moi !!)
T'as même pas dormi et tu bosses autant !!
T'es trop forte !!!!!!!! 🥹
En écrivant tout ça je me demande si ça va vraiment bien se traduire en français
Cette semaine encore, grâce à toi Hyeona, c'était vraiment bien
Et que le bonheur continue pour nous deux 💕`,
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
    }, 120);

    return () => clearInterval(interval);
  }, [isAnimating, fullText]);

  return (
    <div>
      <div className="flex justify-center gap-16">
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
            height: '300px',
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
