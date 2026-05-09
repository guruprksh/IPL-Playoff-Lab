/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Match, StandingsEntry } from '../types/ipl';
import { cn, getNRRColor } from '../lib/utils';
import { Target, TrendingUp, Activity, X } from 'lucide-react';

interface TeamDetailProps {
  team: StandingsEntry;
  matches: Match[];
  probability: number;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function TeamDetail({ team, matches, probability, onClose, isFavorite, onToggleFavorite }: TeamDetailProps) {
  const teamMatches = matches.filter(m => m.team1 === team.id || m.team2 === team.id);
  const remainingMatches = teamMatches.filter(m => !m.isCompleted);
  
  // Basic scenario heuristic
  const pointsToSafety = 16;
  const currentPoints = team.points;
  const pointsNeeded = Math.max(0, pointsToSafety - currentPoints);
  const winsNeeded = Math.ceil(pointsNeeded / 2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full max-w-4xl h-[85vh] bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div 
          className="h-48 relative overflow-hidden flex items-center px-10 gap-8 shrink-0"
          style={{ background: `linear-gradient(135deg, ${team.color}22, #0a0a0c)` }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -mr-32 -mt-32" />
          
          <div className="w-24 h-24 rounded-full border-4 border-white/10 bg-black/40 flex items-center justify-center p-4 shadow-2xl relative z-10">
            {team.logo.startsWith('http') ? (
              <img src={team.logo} alt={team.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            ) : (
                <span className="text-5xl">{team.logo}</span>
            )}
          </div>

          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{team.name}</h2>
              <button 
                onClick={onToggleFavorite}
                className={cn(
                  "px-3 py-1 rounded text-[10px] font-bold uppercase transition-all border",
                  isFavorite ? "text-white" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                )}
                style={{ 
                  backgroundColor: isFavorite ? 'var(--theme-primary, #06b6d4)' : undefined,
                  borderColor: isFavorite ? 'var(--theme-primary, #06b6d4)' : undefined
                }}
              >
                {isFavorite ? "Favorite Team" : "Set as Favorite"}
              </button>
            </div>
            <div className="flex gap-6 mt-4">
               <div className="flex flex-col">
                 <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest leading-none mb-1">Qual Probability</span>
                 <span className="text-2xl font-mono font-bold" style={{ color: 'var(--theme-primary, #22d3ee)' }}>{probability.toFixed(1)}%</span>
               </div>
               <div className="w-px h-8 bg-white/10" />
               <div className="flex flex-col">
                 <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest leading-none mb-1">Current Points</span>
                 <span className="text-2xl font-mono font-bold">{team.points}</span>
               </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group z-20"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Recent Form */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-500 flex items-center gap-2">
               <Activity className="w-4 h-4" style={{ color: 'var(--theme-secondary, #3b82f6)' }} /> Recent Schedule Performance
            </h3>
            <div className="space-y-3">
              {teamMatches.slice(-8).map((match) => (
                <div 
                  key={match.id}
                  className={cn(
                    "p-4 rounded-xl border flex items-center justify-between transition-all bg-white/[0.02] border-white/5",
                    match.isCompleted && match.winnerId === team.id && "bg-emerald-500/5 border-emerald-500/20",
                    match.isCompleted && match.winnerId && match.winnerId !== team.id && "bg-red-500/5 border-red-500/20"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">{match.date}</span>
                    <span className="text-sm font-bold mt-1 tracking-tight">vs {match.team1 === team.id ? match.team2 : match.team1}</span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    {match.isCompleted ? (
                      <span className={cn(
                        "text-[10px] font-black uppercase px-2 py-0.5 rounded",
                        match.winnerId === team.id ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                      )}>
                        {match.winnerId === team.id ? 'W' : 'L'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Upcoming</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Strategy Insights */}
          <section className="flex flex-col gap-8">
            <div 
              className="p-6 border rounded-2xl relative overflow-hidden transition-all duration-700"
              style={{ 
                borderColor: 'var(--theme-primary, rgba(6, 182, 212, 0.2))',
                backgroundColor: 'var(--theme-glow, rgba(6, 182, 212, 0.05))'
              }}
            >
               <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full" style={{ backgroundColor: 'var(--theme-glow, rgba(6, 182, 212, 0.1))' }} />
               <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--theme-primary, #22d3ee)' }}>
                  <TrendingUp className="w-4 h-4" /> Tactical Outlook
               </h3>
               <p className="text-sm leading-relaxed text-gray-300 relative z-10 italic">
                  Based on the remaining {remainingMatches.length} fixtures, {team.name} needs {winsNeeded} more wins to reach the safety threshold. The simulation suggests a {probability > 60 ? 'strong' : probability > 30 ? 'challenging' : 'critical'} path forward.
               </p>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
               <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-400 flex gap-2 items-center">
                  <Target className="w-4 h-4 text-gray-500" /> Operational Metrics
               </h3>
               <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">NRR Quotient</span>
                    <span className={cn("text-xl font-mono font-bold mt-1", getNRRColor(team.nrr))}>
                        {team.nrr > 0 ? '+' : ''}{team.nrr.toFixed(3)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Win Efficiency</span>
                    <span className="text-xl font-mono font-bold mt-1">
                        {team.matchesPlayed > 0 ? ((team.wins / team.matchesPlayed) * 100).toFixed(0) : 0}%
                    </span>
                  </div>
               </div>
            </div>
          </section>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-white/10 bg-black flex justify-between items-center shrink-0">
            <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest leading-none">Security Protocol: Active Analytics v4.2</span>
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-cyan-500 hover:text-white transition-all shadow-xl active:scale-95"
            >
                Return to Core
            </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
