/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
  secondaryColor: string;
  logo: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  nrr: number;
  points: number;
}

export interface Match {
  id: number;
  team1: string; // Team ID
  team2: string; // Team ID
  date: string;
  venue: string;
  winnerId?: string; // Initially undefined
  margin?: string;
  isCompleted: boolean;
}

export interface StandingsEntry extends Team {
  rank: number;
  qualificationProb?: number;
}

export interface SimulationResult {
  standings: StandingsEntry[];
  probableQualifiers: string[];
}
