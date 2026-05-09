/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Team, Match, StandingsEntry } from '../types/ipl';

/**
 * Calculates standings based on teams and match outcomes (including simulated ones)
 */
export function calculateStandings(teams: Team[], matches: Match[]): StandingsEntry[] {
  const standings: Record<string, Team & { rank: number }> = {};

  // Initialize with base stats
  teams.forEach(team => {
    standings[team.id] = { ...team, rank: 0 };
    // Reset points/stats to base if we're simulating from scratch OR 
    // keep as is if base is "current standings" and matches are "remaining"
    // For this app, we'll assume teams[] has "current" stats and matches[] has "remaining/modified" ones
  });

  // Apply match outcomes
  matches.forEach(match => {
    if (match.isCompleted && match.winnerId) {
      const winner = standings[match.winnerId];
      const loserId = match.team1 === match.winnerId ? match.team2 : match.team1;
      const loser = standings[loserId];

      if (winner && loser) {
        winner.wins += 1;
        winner.points += 2;
        winner.matchesPlayed += 1;
        
        loser.losses += 1;
        loser.matchesPlayed += 1;
        
        // NRR simplification: winning adds some virtual NRR
        // In a real app we'd need runs/overs. For simulator, let's assume small impact
        winner.nrr += 0.02;
        loser.nrr -= 0.02;
      }
    }
  });

  // Sort by Points, then NRR
  return Object.values(standings)
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.nrr - a.nrr;
    })
    .map((team, index) => ({
      ...team,
      rank: index + 1
    }));
}

/**
 * Checks if a team qualifies for playoffs (Top 4)
 */
export function isQualified(teamId: string, standings: StandingsEntry[]): boolean {
  const team = standings.find(s => s.id === teamId);
  return team ? team.rank <= 4 : false;
}
