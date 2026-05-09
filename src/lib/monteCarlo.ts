/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Team, Match, StandingsEntry } from '../types/ipl';
import { calculateStandings } from './simulationEngine';

/**
 * Monte Carlo Simulation
 * Runs N simulations of remaining matches to calculate qualification probabilities
 */
export function runMonteCarlo(teams: Team[], matches: Match[], iterations: number = 1000): Record<string, number> {
  const qualificationCounts: Record<string, number> = {};
  teams.forEach(t => qualificationCounts[t.id] = 0);

  const remainingMatches = matches.filter(m => !m.isCompleted);
  const completedMatches = matches.filter(m => m.isCompleted);

  for (let i = 0; i < iterations; i++) {
    const simulatedMatches: Match[] = remainingMatches.map(m => {
      // Simple random winner. Weighted by team strength (nrr) could be better
      const winnerId = Math.random() > 0.5 ? m.team1 : m.team2;
      return { ...m, isCompleted: true, winnerId };
    });

    const fullSeasonMatches = [...completedMatches, ...simulatedMatches];
    const finalStandings = calculateStandings(teams, fullSeasonMatches);

    finalStandings.slice(0, 4).forEach(qualifier => {
      qualificationCounts[qualifier.id]++;
    });
  }

  // Convert to percentages
  const probabilities: Record<string, number> = {};
  teams.forEach(t => {
    probabilities[t.id] = (qualificationCounts[t.id] / iterations) * 100;
  });

  return probabilities;
}
