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
 * Suggests the best winners for incomplete matches to maximize qualification chance of targetTeamId
 */
export function suggestOptimalScenario(teams: Team[], matches: Match[], targetTeamId: string): Match[] {
  const optimizedMatches = [...matches];
  const incompleteMatches = optimizedMatches.filter(m => !m.isCompleted);

  // We iterate through incomplete matches and greedily pick the best winner
  incompleteMatches.forEach(match => {
    if (match.team1 === targetTeamId) {
      match.isCompleted = true;
      match.winnerId = match.team1;
    } else if (match.team2 === targetTeamId) {
      match.isCompleted = true;
      match.winnerId = match.team2;
    } else {
      // Evaluate both outcomes
      const standingsA = calculateStandings(teams, optimizedMatches.map(m => 
        m.id === match.id ? { ...m, isCompleted: true, winnerId: m.team1 } : m
      ));
      const standingsB = calculateStandings(teams, optimizedMatches.map(m => 
        m.id === match.id ? { ...m, isCompleted: true, winnerId: m.team2 } : m
      ));

      const rankA = standingsA.find(s => s.id === targetTeamId)?.rank || 11;
      const rankB = standingsB.find(s => s.id === targetTeamId)?.rank || 11;

      if (rankA < rankB) {
        match.winnerId = match.team1;
      } else if (rankB < rankA) {
        match.winnerId = match.team2;
      } else {
        // If ranks same, penalize the team with higher current points to prevent them pulling away
        const teamA = teams.find(t => t.id === match.team1);
        const teamB = teams.find(t => t.id === match.team2);
        if ((teamA?.points || 0) < (teamB?.points || 0)) {
          match.winnerId = match.team1;
        } else {
          match.winnerId = match.team2;
        }
      }
      match.isCompleted = true;
    }
  });

  return optimizedMatches;
}
