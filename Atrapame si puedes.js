import { useState, useEffect } from 'react';

export default function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [position, setPosition] = useState({ top: '70%', left: '50%' });
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [bestScore, setBestScore] = useState(
    parseInt(localStorage.getItem('bestScore')) || 0
  );
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('gameHistory')) || []
  );
  const [showNewRecord, setShowNewRecord] = useState(false);
  const [gameAreaClass, setGameAreaClass] = useState('relative w-full h-[60vh] max-w-md mx-auto');

  // Iniciar juego
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
      localStorage.setItem('gameHistory', JSON.stringify(newHistory));
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem('bestScore', score);
        setShowNewRecord(true);
        setTimeout(() => setShowNewRecord(false), 2000);
      }
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameOver]);

  // Mover el botón aleatoriamente
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
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
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
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C4.667 23.985 5.073 24 8.333 24h7.334c3.26 0 3.666-.015 4.947-.072 1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.686.072-4.947s-.015-3.667-.072-4.947c-.06-1.278-.262-2.148-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.646.522 19.856.217c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.266-.061-1.647-.061-4.844 0-3.196.016-3.586.061-4.86.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
                Sugerencias?
              </a>

              <div className="border-t border-gray-700 my-1"></div>
              <span className="block px-4 py-2 text-xs opacity-60">Versión 1.0</span>
            </div>
          </div>
        )}
      </div>

      {/* Área superior: información del juego */}
      <div className="w-full max-w-md text-center mb-6">
        <h2 className="text-lg mb-2 opacity-80">¡Atrapa al botón fugaz!</h2>
        {!gameStarted ? null : (
          <div className="flex justify-between items-center mb-4 px-4">
            <span className="font-semibold">⏰ Tiempo: {timeLeft}</span>
            <span className="font-semibold">🎯 Puntuación: {score}</span>
            <span className="font-semibold">🏆 Récord: {bestScore}</span>
          </div>
        )}
      </div>

      {/* Notificación de nuevo récord */}
      {showNewRecord && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full shadow-lg animate-fade-in-out z-50">
          🎉 ¡Nuevo récord! {score} puntos
        </div>
      )}

      {/* Área central: botón fugaz con animación */}
      <div className={gameAreaClass}>
        {!gameStarted ? (
          <button
            onClick={() => setGameStarted(true)}
            className={`w-full py-4 text-lg font-semibold rounded-full shadow-lg ${darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-400 text-gray-900'} hover:bg-yellow-300 transition transform hover:scale-105`}
          >
            Comenzar Juego
          </button>
        ) : (
          <>
            {!gameOver ? (
              <div
                className={`absolute px-4 py-2 bg-red-600 rounded-full cursor-pointer shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-6 ${darkMode ? 'shadow-red-900/30' : ''}`}
                style={{
                  top: position.top,
                  left: position.left,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={moveButton}
              >
                ❌ ¡Atrápame si puedes!
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl font-bold mb-2">⏱️ ¡Tiempo terminado!</h2>
                <p className="text-xl mb-4">Tu puntuación final: {score}</p>
                <button
                  onClick={resetGame}
                  className={`px-6 py-2 rounded-full hover:bg-green-400 transition ${darkMode ? 'bg-green-700 hover:bg-green-600' : 'bg-green-500'}`}
                >
                  Volver a jugar
                </button>
                <div className="mt-6 w-full max-w-xs">
                  <h3 className="text-sm font-medium mb-2 opacity-80">Historial (últimas 5)</h3>
                  <ul className="space-y-1 text-sm opacity-70">
                    {history.length > 0 ? (
                      history.map((h, i) => (
                        <li key={i} className="text-right pr-2">Partida {i + 1}: {h}</li>
                      ))
                    ) : (
                      <li className="text-center">Sin datos aún</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Estilos de animación personalizada */}
      <style jsx>{`
        @keyframes pulse-scale {
          0% { transform: scale(1); }
          50% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-pulse-scale {
          animation: pulse-scale 0.5s ease;
        }
        .animate-fade-in-out {
          animation: fade-in-out 2s ease forwards;
        }
      `}</style>
    </div>
  );
}