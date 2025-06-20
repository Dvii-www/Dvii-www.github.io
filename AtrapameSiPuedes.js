import { useState, useEffect } from 'react';

export default function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [position, setPosition] = useState({ top: '70%', left: '50%' });
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [gameAreaClass, setGameAreaClass] = useState('relative w-full h-[60vh] max-w-md mx-auto');

  // Iniciar juego y temporizador
  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0 && !gameOver) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameOver(true);
      const newHistory = [score, ...history].slice(0, 5);
      setHistory(newHistory);

      if (score > bestScore) {
        setBestScore(score);
      }
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameOver]);

  // Mover botón aleatoriamente al hacer clic
  const moveButton = () => {
    const minTop = 40;
    const maxTop = 90;
    const minLeft = 10;
    const maxLeft = 90;
    const newTop = Math.floor(Math.random() * (maxTop - minTop)) + minTop + '%';
    const newLeft = Math.floor(Math.random() * (maxLeft - minLeft)) + minLeft + '%';
    setPosition({ top: newTop, left: newLeft });
    setScore(prev => prev + 1);
  };

  // Reiniciar juego con animación
  const resetGame = () => {
    setGameAreaClass('relative w-full h-[60vh] max-w-md mx-auto animate-pulse-scale');
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setGameStarted(true);
    setShowMenu(false);
    setPosition({ top: '70%', left: '50%' });
    setTimeout(() => {
      setGameAreaClass('relative w-full h-[60vh] max-w-md mx-auto');
    }, 500);
  };

  // Cambiar tiempo del juego
  const changeTime = (newTime) => {
    setTimeLeft(newTime);
    setShowMenu(false);
  };

  // Alternar modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-between p-6 text-white ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-400 to-purple-600'} transition-colors duration-500`}>
      {/* Menú esquina superior izquierda */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`text-xl font-bold focus:outline-none ${darkMode ? 'text-yellow-400' : 'text-white'}`}
        >
          .dvii
        </button>
        {/* Menú desplegable */}
        {showMenu && (
          <div className={`mt-2 absolute z-10 w-48 rounded-md shadow-lg bg-gray-800 text-gray-200 ring-1 ring-gray-700 ring-opacity-50 transition-all duration-200`}>
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                onClick={resetGame}
                className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700"
                role="menuitem"
              >
                🔄 Reiniciar Juego
              </button>
              <button
                onClick={() => changeTime(15)}
                className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700"
                role="menuitem"
              >
                ⏱️ 15 segundos
              </button>
              <button
                onClick={() => changeTime(30)}
                className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700"
                role="menuitem"
              >
                ⏱️ 30 segundos
              </button>
              <button
                onClick={() => changeTime(60)}
                className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700"
                role="menuitem"
              >
                ⏱️ 60 segundos
              </button>
              <button
                onClick={toggleDarkMode}
                className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700"
                role="menuitem"
              >
                {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
              </button>
              {/* Botón de Sugerencias? */}
              <a
                href="https://www.instagram.com/call.me_dvii/?__pwa=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-gray-700 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" style={{ color: '#E1306C' }}> 
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C4.667 23.985 5.073 24 8.333 24h7.334c3.26 0 3.666-.015 4.947-.072 1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.686.072-4.947s-.015-3.667-.072-4.947c-.06-1.278-.262-2.148-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.646.522 19.856.217c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1