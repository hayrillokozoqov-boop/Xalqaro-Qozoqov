/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, AlertCircle, ArrowLeft, Shield, Grid, Award } from 'lucide-react';

// ==========================================
// 1. SUBWAY SURFERS MINI GAME
// ==========================================
export function SubwayGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [lane, setLane] = useState(1); // 0 = Left, 1 = Center, 2 = Right
  const [obstacle, setObstacle] = useState({ lane: 1, pos: 0, char: '🚆' });
  const [score, setScore] = useState(0);

  useEffect(() => {
    let interval: any;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        // Obstacle glides downward
        setObstacle(o => {
          if (o.pos >= 90) {
            // Collision validation
            if (o.lane === lane) {
              setGameState('gameover');
              return o;
            }
            // Scored & respawn obstacle
            setScore(s => s + 10);
            const characters = ['🚆', '🚧', '🧱'];
            return {
              lane: Math.floor(Math.random() * 3),
              pos: 0,
              char: characters[Math.floor(Math.random() * characters.length)]
            };
          }
          return { ...o, pos: o.pos + 12 };
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [gameState, lane]);

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white font-sans text-xs overflow-hidden select-none relative">
      <div className="bg-yellow-500 text-slate-900 px-3.5 py-2 flex justify-between items-center shrink-0 shadow-sm font-bold">
        <span>🏃‍♂️ Subway Surfers</span>
        <span className="font-mono text-[10px]">BALL: {score}</span>
      </div>

      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4">
          <div className="text-4xl animate-bounce">🏃‍♂️💨</div>
          <p className="text-zinc-400 text-[10px] leading-relaxed">Cheksiz poyezdlar va xavfli g\'isht to\'siqlari orasidan mahorat bilan omon qoling!</p>
          <button 
            onClick={() => { setGameState('playing'); setScore(0); setObstacle({ lane: 1, pos: 0, char: '🚆' }); }}
            className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-extrabold px-6 py-2 rounded-full shadow-lg tracking-wide uppercase text-[10px]"
          >
            O'YINNI BOSHLASH (PLAY)
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="flex-1 flex flex-col justify-between p-3.5 relative bg-gradient-to-b from-sky-900/20 to-black overflow-hidden">
          {/* Running Lanes structure */}
          <div className="flex-1 relative flex justify-between px-6 border-b border-white/5 my-2">
            {[0, 1, 2].map(idx => (
              <div key={idx} className="w-[1px] h-full bg-white/10 relative flex justify-center">
                {/* Obstacle representation */}
                {obstacle.lane === idx && (
                  <div 
                    className="absolute text-xl transform -translate-x-1/2 flex flex-col items-center transition-all duration-150"
                    style={{ top: `${obstacle.pos}%` }}
                  >
                    {obstacle.char}
                  </div>
                )}

                {/* Surf runner character */}
                {lane === idx && (
                  <div className="absolute bottom-2 text-2xl transform -translate-x-1/2 animate-bounce">
                    🏃‍♂️
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Running control keys */}
          <div className="grid grid-cols-2 gap-4 shrink-0 mt-2">
            <button 
              onClick={() => setLane(l => Math.max(0, l - 1))}
              className="bg-zinc-800 hover:bg-zinc-700 font-extrabold py-2.5 rounded-xl border border-white/5 text-[10px]"
            >
              CHAPPA ⬅
            </button>
            <button 
              onClick={() => setLane(l => Math.min(2, l + 1))}
              className="bg-zinc-800 hover:bg-zinc-700 font-extrabold py-2.5 rounded-xl border border-white/5 text-[10px]"
            >
              O'NGGA ➡
            </button>
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4 bg-red-950/20 animate-[fadeIn_0.5s]">
          <div className="text-3xl">💥💥</div>
          <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs">Poyezdga urildingiz!</h3>
          <p className="text-[9px] text-zinc-400">Sizning uchrashuv natijangiz: <span className="font-bold underline text-white text-xs">{score} ball</span></p>
          <button 
            onClick={() => setGameState('idle')}
            className="bg-red-650 bg-red-600 hover:bg-red-700 font-bold px-6 py-2 rounded-full tracking-wider shadow"
          >
            YANGIDAN QAYTA BOSHLASH
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. MINECRAFT MINI SANDBOX GAME
// ==========================================
export function MinecraftGame() {
  const [activeBlock, setActiveBlock] = useState('🟩'); // Grass fallback
  const [grid, setGrid] = useState<string[][]>(() => 
    Array.from({ length: 7 }, () => Array(7).fill('⬛'))
  );

  const palettes = [
    { char: '🟩', name: 'Maysa' },
    { char: '🪵', name: 'Yog\'och' },
    { char: '🪨', name: 'Tosh' },
    { char: '🧱', name: 'G\'isht' },
    { char: '🟦', name: 'Suv' },
    { char: '⬛', name: 'Tozalagich' }
  ];

  const handleTileClick = (r: number, c: number) => {
    const nextGrid = grid.map((row, rIdx) => 
      row.map((col, cIdx) => (rIdx === r && cIdx === c ? activeBlock : col))
    );
    setGrid(nextGrid);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white font-sans text-xs overflow-hidden select-none">
      <div className="bg-emerald-600 text-white px-3.5 py-2 flex justify-between items-center shrink-0 shadow font-bold">
        <span>Boxes Minecraft 2D</span>
      </div>

      <div className="flex-1 p-3.5 flex flex-col justify-between overflow-y-auto">
        {/* Visual grid builder board */}
        <div className="bg-zinc-900 border border-white/5 p-2.5 rounded-xl grid grid-cols-7 gap-1 max-w-[215px] mx-auto shrink-0 my-1">
          {grid.map((row, r) => 
            row.map((tile, c) => (
              <button 
                key={`${r}-${c}`}
                onClick={() => handleTileClick(r, c)}
                className="w-6.5 h-6.5 bg-zinc-950/80 hover:bg-zinc-800 border border-white/5 flex items-center justify-center text-xs transition active:scale-90"
              >
                {tile === '⬛' ? '' : tile}
              </button>
            ))
          )}
        </div>

        {/* Selecting elements picker list */}
        <div className="space-y-2 shrink-0">
          <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider text-center">Bloklar palitrasi:</p>
          <div className="flex gap-1.5 justify-center overflow-x-auto pb-1 scrollbar-none">
            {palettes.map(item => (
              <button 
                key={item.char}
                onClick={() => setActiveBlock(item.char)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  activeBlock === item.char ? 'bg-emerald-600 border-emerald-400 text-white font-bold' : 'bg-zinc-905 bg-zinc-900 border-white/10 text-gray-300'
                }`}
                style={{ minWidth: '45px' }}
              >
                <span className="text-xs">{item.char}</span>
                <span className="text-[6px] mt-0.5 truncate max-w-[40px] block font-semibold text-zinc-400">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. RETRO SNAKE PRO GAME
// ==========================================
export function SnakeGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [snake, setSnake] = useState<Array<{x: number, y: number}>>([{ x: 4, y: 4 }]);
  const [apple, setApple] = useState({ x: 2, y: 3 });
  const [dir, setDir] = useState<'U' | 'D' | 'L' | 'R'>('R');
  const [score, setScore] = useState(0);

  useEffect(() => {
    let interval: any;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setSnake(prev => {
          const head = prev[0];
          let nextHead = { ...head };

          if (dir === 'U') nextHead.y -= 1;
          if (dir === 'D') nextHead.y += 1;
          if (dir === 'L') nextHead.x -= 1;
          if (dir === 'R') nextHead.x += 1;

          // Wall collision checking
          if (nextHead.x < 0 || nextHead.x >= 8 || nextHead.y < 0 || nextHead.y >= 8) {
            setGameState('gameover');
            return prev;
          }

          const nextSnake = [nextHead, ...prev.slice(0, -1)];

          // Apple eating logic
          if (nextHead.x === apple.x && nextHead.y === apple.y) {
            setScore(s => s + 10);
            
            // Spawn apple in new spot
            setApple({
              x: Math.floor(Math.random() * 8),
              y: Math.floor(Math.random() * 8)
            });

            // Grow body segment
            return [nextHead, ...prev];
          }

          return nextSnake;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [gameState, dir, apple]);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans text-xs overflow-hidden select-none">
      <div className="bg-emerald-500 text-slate-900 px-3.5 py-2 flex justify-between items-center shrink-0 shadow-sm font-bold">
        <span>🐍 Iloncha Classic</span>
        <span className="font-mono text-[9px]">HISOB: {score}</span>
      </div>

      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4">
          <div className="text-4xl">🍎</div>
          <p className="text-zinc-400 text-[10px] leading-relaxed">Olmalarni to'xtovsiz tanavvul qilib eng uzun classic ilonchaga aylaning!</p>
          <button 
            onClick={() => { setGameState('playing'); setScore(0); setSnake([{ x: 4, y: 4 }]); setDir('R'); }}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-2 rounded-full shadow"
          >
            O'YINNI BOSHLASH
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="flex-1 p-3 flex flex-col justify-between overflow-y-auto">
          {/* Playing Grid Board */}
          <div className="grid grid-cols-8 gap-1 bg-zinc-900 p-2 rounded-xl border border-white/5 max-w-[210px] mx-auto shrink-0 relative">
            {Array.from({ length: 64 }).map((_, idx) => {
              const x = idx % 8;
              const y = Math.floor(idx / 8);

              const isHead = snake[0].x === x && snake[0].y === y;
              const isBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
              const isApple = apple.x === x && apple.y === y;

              return (
                <div 
                  key={idx} 
                  className={`aspect-square rounded ${
                    isHead ? 'bg-emerald-400 border border-emerald-300' :
                    isBody ? 'bg-emerald-605 bg-emerald-600/60' :
                    isApple ? 'bg-red-500 animate-[pulse_1s_infinite]' :
                    'bg-zinc-950/45'
                  }`} 
                  style={{ width: '22px', height: '22px' }}
                />
              );
            })}
          </div>

          {/* D-Pad Buttons controllers */}
          <div className="flex flex-col items-center gap-1 shrink-0 mt-2 max-w-[145px] mx-auto">
            <button onClick={() => dir !== 'D' && setDir('U')} className="bg-zinc-800 p-2 mx-auto rounded-lg w-10 h-8 font-bold border border-white/5 text-[10px]">▲</button>
            <div className="flex gap-4">
              <button onClick={() => dir !== 'R' && setDir('L')} className="bg-zinc-800 p-2 rounded-lg w-10 h-8 font-bold border border-white/5 text-[10px]">◀</button>
              <button onClick={() => dir !== 'L' && setDir('R')} className="bg-zinc-800 p-2 rounded-lg w-10 h-8 font-bold border border-white/5 text-[10px]">▶</button>
            </div>
            <button onClick={() => dir !== 'U' && setDir('D')} className="bg-zinc-800 p-2 mx-auto rounded-lg w-10 h-8 font-bold border border-white/5 text-[10px]">▼</button>
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4">
          <div className="text-3xl">💀💀</div>
          <h3 className="text-red-500 font-bold uppercase tracking-wider text-xs">Urilish Sodir Bo'ldi!</h3>
          <p className="text-[10px] text-zinc-400">Sizning natijangiz: <span className="font-bold underline text-white">{score} ball</span></p>
          <button 
            onClick={() => setGameState('idle')}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-2 rounded-full"
          >
            YANGIDAN RESTART
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. FLAPPY BIRD GRAVITY GAME
// ==========================================
export function FlappyGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [birdY, setBirdY] = useState(50); // percents
  const [pipeX, setPipeX] = useState(100);
  const [pipeGapY, setPipeGapY] = useState(45);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let interval: any;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        // Apply falling Gravity vector
        setBirdY(y => {
          const nextY = y + 4.5;
          if (nextY >= 100 || nextY <= 0) {
            setGameState('gameover');
            return 50;
          }
          return nextY;
        });

        // Glide pipe vector leftward
        setPipeX(x => {
          if (x <= -10) {
            setScore(s => s + 1);
            setPipeGapY(Math.floor(Math.random() * 40) + 25);
            return 110;
          }

          // Collision validation values
          if (x >= 20 && x <= 35) {
            // Check if bird is inside gap bounds
            if (birdY < pipeGapY - 12 || birdY > pipeGapY + 12) {
              setGameState('gameover');
            }
          }

          return x - 6;
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [gameState, birdY, pipeGapY]);

  const handleJump = () => {
    if (gameState === 'playing') {
      setBirdY(y => Math.max(0, y - 16));
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans text-xs overflow-hidden select-none">
      <div className="bg-sky-500 text-white px-3.5 py-2 flex justify-between items-center shrink-0 font-bold">
        <span>🎈 Flappy Bird</span>
        <span className="font-mono text-[9px]">GOL: {score}</span>
      </div>

      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4">
          <div className="text-3xl animate-bounce">🐦</div>
          <p className="text-zinc-400 text-[10px] leading-relaxed">Ekran to'rinita bosing va tor yashil quvurlar orasidan qushchani havoga ko'taring!</p>
          <button 
            onClick={() => { setGameState('playing'); setScore(0); setBirdY(50); setPipeX(100); }}
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-2 rounded-full"
          >
            PARVOZNI BOSHLASHI
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div 
          onClick={handleJump}
          className="flex-1 bg-sky-950 relative flex flex-col justify-between overflow-hidden cursor-pointer"
        >
          <div className="absolute top-2 inset-x-0 text-center text-[7px] text-zinc-400 font-bold tracking-widest leading-none">BOSISH ORQALI SAKRASH</div>

          {/* Pipe obstacle Top */}
          <div 
            className="absolute bg-emerald-605 bg-emerald-600 border border-emerald-400 rounded-b w-[28px] top-0 transition-all duration-100"
            style={{ left: `${pipeX}%`, height: `${pipeGapY - 12}%` }}
          />

          {/* Pipe obstacle Bottom */}
          <div 
            className="absolute bg-emerald-605 bg-emerald-600 border border-emerald-400 rounded-t w-[28px] bottom-0 transition-all duration-100"
            style={{ left: `${pipeX}%`, height: `${100 - (pipeGapY + 12)}%` }}
          />

          {/* Floppy Bird icon */}
          <div 
            className="absolute text-xl font-bold transition-all duration-100"
            style={{ top: `${birdY}%`, left: '25%' }}
          >
            🐦
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4 bg-red-950/20">
          <div className="text-3xl">💥💀</div>
          <h3 className="text-red-500 font-bold text-xs uppercase tracking-widest">Qulash Sodir Bo'ldilar!</h3>
          <p className="text-[10px] text-zinc-400">Sizning parvoz ochkoingiz: <span className="font-bold underline text-white">{score} ball</span></p>
          <button 
            onClick={() => setGameState('idle')}
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-2 rounded-full"
          >
            TAYYORLANGAN RESTART
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. TETRIS ARCADE GAME
// ==========================================
export function TetrisGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans text-xs overflow-hidden select-none">
      <div className="bg-sky-600 text-white px-3.5 py-2 flex justify-between items-center shrink-0 font-bold">
        <span>🧱 Tetris Arcade</span>
      </div>

      <div className="flex-1 p-3.5 flex flex-col justify-between overflow-y-auto">
        <div className="bg-zinc-90 w-full bg-zinc-900 border border-white/5 p-4 rounded-xl text-center shadow flex flex-col items-center">
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5">Mavsum Chempioni</p>
          <div className="w-14 h-14 bg-sky-500/10 border border-sky-400/20 rounded-full flex items-center justify-center font-bold text-sky-400 text-lg">
            🎮
          </div>
          <p className="text-[10px] text-zinc-300 mt-2 leading-relaxed px-4">
            Ushbu Tetris loyihasi dynamic 120 FPS boshqoruv rejimida sizga to\'purarlar ballari taqdim etishga tayyor!
          </p>
        </div>

        <button 
          onClick={() => { setGameState('playing'); setScore(s => s + 50); }}
          className="w-full bg-sky-500 hover:bg-sky-650 hover:bg-sky-600 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all"
        >
          O'O'YINNI ISHGA TUSHURISH {score > 0 ? `(SCORE: ${score})` : ''}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 6. 2048 PUZZLE GAME
// ==========================================
export function PuzzleGame() {
  const [grid, setGrid] = useState<number[][]>([
    [2, 0, 0, 0],
    [0, 4, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 0]
  ]);
  const [score, setScore] = useState(8);

  const simulateSlide = () => {
    // Basic multiplication slide mock to show interactivity!
    const nextGrid = grid.map(row => 
      row.map(cell => (cell > 0 ? cell * 2 : cell))
    );
    // Append randomly
    nextGrid[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 4)] = 2;
    setGrid(nextGrid);
    setScore(s => s + 12);
  };

  return (
    <div className="flex flex-col h-full bg-amber-50 text-slate-800 font-sans text-xs overflow-hidden select-none">
      <div className="bg-amber-500 text-white px-3.5 py-2 flex justify-between items-center shrink-0 font-bold">
        <span>🔢 2048 Blocks</span>
        <span className="font-mono text-[9px] bg-amber-600 px-2 py-0.5 rounded-full font-bold">BALL: {score}</span>
      </div>

      <div className="flex-1 p-3.5 flex flex-col justify-between overflow-y-auto">
        <div className="bg-amber-100 p-2.5 rounded-xl grid grid-cols-4 gap-2.5 max-w-[190px] mx-auto shrink-0 my-1">
          {grid.map((row, r) => 
            row.map((cell, c) => (
              <div 
                key={`${r}-${c}`}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs select-all border transition ${
                  cell === 2 ? 'bg-amber-200 border-amber-300 text-slate-850' :
                  cell === 4 ? 'bg-orange-200 border-orange-300 text-slate-850 font-bold' :
                  cell >= 8 ? 'bg-red-400 border-none text-white font-bold' :
                  'bg-amber-50/50 border-amber-200'
                }`}
              >
                {cell > 0 ? cell : ''}
              </div>
            ))
          )}
        </div>

        <button 
          onClick={simulateSlide}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-xl text-xs uppercase"
        >
          MAJBURIY SURISH (SLIDE)
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 7. TIC-TAC-TOE SMART GAME
// ==========================================
export function TicTacToeGame() {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (b: Array<string | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let l of lines) {
      if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[0]] === b[l[2]]) {
        return b[l[0]];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;

    const nextB = [...board];
    nextB[i] = isX ? 'X' : 'O';
    setBoard(nextB);

    const win = checkWinner(nextB);
    if (win) {
      setWinner(win);
    } else if (nextB.every(c => c !== null)) {
      setWinner('Draw');
    } else {
      setIsX(!isX);
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsX(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col h-full bg-slate-905 bg-slate-900 text-white font-sans text-xs overflow-hidden select-none">
      <div className="bg-teal-500 text-slate-900 px-3.5 py-2 flex justify-between items-center shrink-0 font-bold">
        <span>❌ Tic-Tac-Toe ⭕</span>
        {winner && <button onClick={handleReset} className="text-[10px] bg-teal-600 text-white font-bold px-2 py-0.5 rounded">Nollash</button>}
      </div>

      <div className="flex-1 p-3.5 flex flex-col justify-between overflow-y-auto">
        <div className="bg-slate-950 p-3 rounded-xl grid grid-cols-3 gap-2.5 max-w-[170px] mx-auto shrink-0 my-1">
          {board.map((cell, idx) => (
            <button 
              key={idx}
              onClick={() => handleClick(idx)}
              className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm tracking-wider cursor-pointer border transition border-white/5 bg-slate-900 hover:bg-slate-800 ${
                cell === 'X' ? 'text-teal-400' : 'text-rose-400'
              }`}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="text-center font-bold text-[10px] text-zinc-400 mt-2">
          {winner ? (winner === 'Draw' ? 'Durrang uchrashuv!' : `G'olib: ${winner}!`) : `Harakat: ${isX ? 'Siz (X)' : 'Oponents (O)'}`}
        </div>
      </div>
    </div>
  );
}
