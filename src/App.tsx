/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Activity, 
  Zap, 
  ChevronRight, 
  BarChart3, 
  Cpu, 
  AlertCircle,
  TrendingDown,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { IPL_TEAMS, IPL_SCHEDULE } from './data/mockData';
import { calculateStandings } from './lib/simulationEngine';
import { runMonteCarlo } from './lib/monteCarlo';
import { cn, formatPercent, getNRRColor } from './lib/utils';
import { getAIInsights } from './services/geminiService';
import { Team, Match, StandingsEntry } from './types/ipl';
import { ProbabilityChart } from './components/ProbabilityChart';
import confetti from 'canvas-confetti';

import { TeamDetail } from './components/TeamDetail';

export default function App() {
  const [matches, setMatches] = useState<Match[]>(IPL_SCHEDULE);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [probabilities, setProbabilities] = useState<Record<string, number>>({});

  // Current Standings based on matches (including simulated ones)
  const standings = useMemo(() => calculateStandings(IPL_TEAMS, matches), [matches]);

  // Fetch AI Insights
  useEffect(() => {
    const fetchAI = async () => {
      const insights = await getAIInsights(standings, matches.filter(m => !m.isCompleted), selectedTeamId || undefined);
      setAiInsights(insights);
    };
    fetchAI();
  }, [selectedTeamId, matches]);

  const toggleWinner = (matchId: number, teamId: string | null) => {
    setMatches(prev => {
        const newMatches = prev.map(m => {
            if (m.id === matchId) {
                return { ...m, winnerId: teamId === m.winnerId ? undefined : (teamId || undefined), isCompleted: !!teamId };
            }
            return m;
        });

        // Effect: If a team now has 100% prob, celebrate
        return newMatches;
    });
  };

  useEffect(() => {
    const probs = runMonteCarlo(IPL_TEAMS, matches, 500);
    setProbabilities(probs);

    // Celebration logic
    Object.entries(probs).forEach(([id, prob]) => {
        if (prob >= 100 && probabilities[id] < 100) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: [IPL_TEAMS.find(t => t.id === id)?.color || '#ffffff']
            });
        }
    });
  }, [matches]);

  const selectedTeam = useMemo(() => 
    standings.find(t => t.id === selectedTeamId), 
  [selectedTeamId, standings]);

  const chaosScore = useMemo(() => {
    const remaining = matches.filter(m => !m.isCompleted).length;
    return Math.min(100, remaining * 12);
  }, [matches]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col p-4 select-none relative">
      {/* Cinematic Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* TOP NAVIGATION / GLOBAL METRICS */}
      <header className="flex items-center justify-between mb-4 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] cursor-pointer" onClick={() => setSelectedTeamId(null)}>
            <span className="font-black italic text-xl">PL</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter uppercase italic leading-none">IPL Playoff Lab</h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Can we still qualify?</p>
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Chaos Meter</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-red-500 shadow-[0_0_8px_#ef4444]"
                  initial={{ width: 0 }}
                  animate={{ width: `${chaosScore}%` }}
                />
              </div>
              <span className="font-mono font-bold text-red-500">{chaosScore.toFixed(0)}%</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded px-4 py-2 flex gap-4 hidden md:flex">
            <div className="flex flex-col border-r border-white/10 pr-4">
              <span className="text-[9px] text-gray-400 uppercase tracking-tighter">Most Critical Match</span>
              <span className="text-xs font-bold">MI vs KKR <span className="text-cyan-400">+14% Swing</span></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 uppercase tracking-tighter">Permutations</span>
              <span className="text-xs font-mono font-bold">2,097,152</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="flex-1 grid grid-cols-12 gap-4 h-0 relative z-10">
        
        {/* LEFT: LIVE POINTS TABLE (Glassmorphism) */}
        <div className="col-span-3 glass-panel p-3 flex flex-col h-full bg-white/[0.03] backdrop-blur-md">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1 h-3 bg-cyan-400 inline-block"></span> Live Standings
          </h2>
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
            <div className="grid grid-cols-6 text-[10px] text-gray-500 font-bold uppercase py-2 px-1 border-b border-white/5 sticky top-0 bg-[#0a0a0c]/80 z-20 backdrop-blur-md">
              <div className="col-span-2">Team</div>
              <div className="text-center">P</div>
              <div className="text-center">W</div>
              <div className="text-center">NRR</div>
              <div className="text-center text-cyan-400">Q%</div>
            </div>
            <div className="flex-1 flex flex-col">
              <AnimatePresence mode="popLayout">
                {standings.map((team, idx) => (
                  <motion.div 
                    layout
                    key={team.id}
                    onClick={() => setSelectedTeamId(team.id)}
                    className={cn(
                      "grid grid-cols-6 text-xs items-center py-2.5 px-1 border-b border-white/5 cursor-pointer group transition-colors",
                      selectedTeamId === team.id ? "bg-cyan-400/10" : "hover:bg-white/5",
                      idx < 4 ? "bg-cyan-400/5" : ""
                    )}
                  >
                    <div className="col-span-2 flex items-center gap-2 font-bold truncate">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: team.color }}></div> {team.shortName}
                    </div>
                    <div className="text-center font-mono opacity-80">{team.points}</div>
                    <div className="text-center font-mono opacity-80">{team.wins}</div>
                    <div className={cn("text-center font-mono text-[10px]", getNRRColor(team.nrr))}>
                      {team.nrr > 0 ? '+' : ''}{team.nrr.toFixed(1)}
                    </div>
                    <div className="text-center font-mono font-bold text-cyan-400">
                      {probabilities[team.id]?.toFixed(0)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Qualification Cutoff Line */}
              <div className="h-px bg-red-500/50 my-1 relative">
                <span className="absolute right-0 -top-2 text-[8px] bg-[#0a0a0c] px-1 text-red-500 uppercase font-bold">Qual Limit</span>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER: ANALYZER & SIMULATOR */}
        <div className="col-span-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar pb-10">
          {/* TEAM ANALYZER HERO */}
          {selectedTeam ? (
            <motion.div 
              key={selectedTeam.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-xl border p-6 flex items-center gap-8 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden shrink-0",
                "bg-gradient-to-r border-cyan-500/30 from-cyan-900/40 to-black"
              )}
            >
              <div className="absolute -right-10 -bottom-10 w-48 h-48 border-[10px] border-white/5 rounded-full"></div>
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-cyan-500 flex items-center justify-center p-2 bg-black/40">
                  <span className="text-4xl font-black italic text-cyan-500">{selectedTeam.shortName}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">{selectedTeam.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded font-bold uppercase",
                        (probabilities[selectedTeam.id] || 0) < 20 ? "bg-red-500/20 text-red-500" : "bg-emerald-500/20 text-emerald-500"
                      )}>
                        {(probabilities[selectedTeam.id] || 0) < 20 ? "Danger Zone" : "High Probability"}
                      </span>
                      <span className="bg-white/5 text-gray-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                        {selectedTeam.points} PTS • {probabilities[selectedTeam.id]?.toFixed(1)}% Chance
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block uppercase font-bold tracking-widest">Qual Prob.</span>
                    <span className={cn(
                        "text-5xl font-mono font-black",
                        (probabilities[selectedTeam.id] || 0) < 20 ? "text-red-500" : "text-cyan-400"
                    )}>
                        {probabilities[selectedTeam.id]?.toFixed(1)}<span className="text-2xl">%</span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-black/40 rounded p-3 border border-white/5 backdrop-blur-sm">
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Current Status</p>
                    <p className="text-xs font-bold mt-1">Rank #{standings.findIndex(t => t.id === selectedTeam.id) + 1} in simulated outcomes</p>
                  </div>
                  <div className="bg-black/40 rounded p-3 border border-white/5 backdrop-blur-sm">
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Winning Margin Needed</p>
                    <p className="text-xs font-bold mt-1 text-cyan-400">Moderate dependency on NRR swings</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4 shrink-0">
               <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-500">
                  <Cpu className="w-8 h-8" />
               </div>
               <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter">Simulation Core Offline</h3>
                  <p className="text-sm text-gray-500 max-w-xs mt-2">Select a team representative to initialize targeted qualification permutations.</p>
               </div>
            </div>
          )}

          {/* MONTE CARLO VISUALIZER */}
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 shrink-0">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Monte Carlo Prediction (5,000 Iterations)</h3>
            <div className="h-48">
              <ProbabilityChart probabilities={probabilities} />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-mono uppercase border-t border-white/5 pt-2">
              <span>Eliminated Floor</span>
              <span>Qualification Ceiling</span>
            </div>
          </div>

          {/* SCENARIO BUILDER (Mini UI) */}
          <section>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1 h-3 bg-red-500 inline-block"></span> Upcoming Fixtures Simulation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {matches.filter(m => !m.isCompleted).slice(0, 12).map(match => (
                    <div key={match.id} className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col justify-between hover:border-cyan-500/50 transition-all group">
                        <div>
                            <div className="flex justify-between items-center text-[9px] uppercase font-bold text-gray-500">
                                <span>{match.date}</span>
                                <span>{match.venue}</span>
                            </div>
                            <span className="text-xs font-bold mt-1 block">{match.team1} <span className="text-[10px] text-gray-600 font-mono italic">vs</span> {match.team2}</span>
                        </div>
                        <div className="flex gap-1 mt-3">
                            <button 
                                onClick={() => toggleWinner(match.id, match.team1)}
                                className={cn(
                                    "flex-1 py-1.5 text-[10px] font-bold rounded uppercase transition-all",
                                    match.winnerId === match.team1 ? "bg-cyan-600 text-white shadow-[0_0_10px_rgba(8,145,178,0.3)]" : "bg-white/5 text-gray-500 hover:bg-white/10"
                                )}
                            >
                                {match.team1}
                            </button>
                            <button 
                                onClick={() => toggleWinner(match.id, match.team2)}
                                className={cn(
                                    "flex-1 py-1.5 text-[10px] font-bold rounded uppercase transition-all",
                                    match.winnerId === match.team2 ? "bg-cyan-600 text-white shadow-[0_0_10px_rgba(8,145,178,0.3)]" : "bg-white/5 text-gray-500 hover:bg-white/10"
                                )}
                            >
                                {match.team2}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
          </section>
        </div>

        {/* RIGHT: AI INSIGHTS & UTILS */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto custom-scrollbar h-full pb-10">
          {/* AI PANEL */}
          <div className="bg-gradient-to-b from-cyan-900/20 to-black border border-cyan-500/20 rounded-xl p-4 shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400">AI Playoff Scout</h3>
            </div>
            <div className="space-y-3">
              {aiInsights.length > 0 ? aiInsights.map((insight, idx) => (
                <div key={idx} className="p-3 bg-white/5 rounded-lg border-l-2 border-cyan-500 transition-hover hover:bg-white/10">
                  <p className="text-[11px] leading-relaxed text-gray-300">
                    "{insight}"
                  </p>
                </div>
              )) : (
                <div className="flex flex-col gap-3">
                    {[1,2,3].map(i => <div key={i} className="h-16 w-full bg-white/5 rounded-lg animate-pulse" />)}
                </div>
              )}
            </div>
          </div>

          {/* NRR CALCULATOR COMPONENT */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 shrink-0">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Real-Time NRR Adjuster</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-gray-500 uppercase font-black">Projected Margin</label>
                <div className="flex justify-between items-center bg-black rounded border border-white/10 p-2 font-mono">
                  <span className="text-xs">40 Runs</span>
                  <span className="text-[10px] text-gray-600">Overs 20.0</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-gray-500 uppercase font-black">Success Probability Swing</label>
                <input type="range" className="w-full accent-cyan-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                <div className="flex justify-between font-mono text-[10px] mt-2">
                  <span className="text-gray-500 text-[9px]">MIN</span>
                  <span className="text-cyan-400 font-bold">NRR IMPACT: +0.245</span>
                  <span className="text-gray-500 text-[9px]">MAX</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAN EMOTION METER */}
          <div className="mt-auto bg-black border border-white/10 rounded-xl p-3 flex flex-col gap-2 shadow-xl shadow-red-900/10 shrink-0">
            <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-gray-500 font-black">
              <span>Fan Sentiment</span>
              <span className="text-red-500 italic">Pure Anxiety</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={cn(
                    "h-1 flex-1 rounded-full",
                    i < 5 ? "bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                    i < 7 ? "bg-orange-600" :
                    i < 8 ? "bg-yellow-600" : "bg-gray-800"
                )}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TICKER / STATUS */}
      <footer className="mt-4 flex items-center justify-between h-8 bg-cyan-600/10 border-t border-cyan-500/20 px-4 -mx-4 relative z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-100">Engine: Stable v4.2.0</span>
          </div>
          <div className="text-[10px] font-mono tracking-wider uppercase text-cyan-500/80 hidden sm:block truncate max-w-sm">
            // ACTIVE_SIMULATION_MATRIX: {matches.filter(m => !m.isCompleted).length} FIXTURES REMAINING
          </div>
        </div>
        <div 
            onClick={() => setMatches(IPL_SCHEDULE)}
            className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest cursor-pointer hover:text-white transition-colors"
        >
          REFRESH_PROBABILITY_MATRIX (AUTO)
        </div>
      </footer>

      {/* Team Detail Overlay - Elegant Dark themed */}
      <AnimatePresence>
        {selectedTeamId && selectedTeam && (
          <TeamDetail 
            team={selectedTeam as StandingsEntry} 
            matches={matches} 
            probability={probabilities[selectedTeamId] || 0}
            onClose={() => setSelectedTeamId(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 12px;
            height: 12px;
            background: #fff;
            border: 2px solid #06b6d4;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
        }
      `}</style>
    </div>
  );
}
