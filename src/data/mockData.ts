/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Team, Match } from '../types/ipl';

export const IPL_TEAMS: Team[] = [
  { id: 'CSK', name: 'Chennai Super Kings', shortName: 'CSK', color: '#FFFF00', secondaryColor: '#0081E9', logo: '🦁', matchesPlayed: 10, wins: 6, losses: 4, nrr: 0.627, points: 12 },
  { id: 'KKR', name: 'Kolkata Knight Riders', shortName: 'KKR', color: '#3A225D', secondaryColor: '#B3A123', logo: '🟣', matchesPlayed: 10, wins: 8, losses: 2, nrr: 1.096, points: 16 },
  { id: 'RR', name: 'Rajasthan Royals', shortName: 'RR', color: '#EA1B85', secondaryColor: '#254AA5', logo: '👑', matchesPlayed: 10, wins: 8, losses: 2, nrr: 0.700, points: 16 },
  { id: 'SRH', name: 'Sunrisers Hyderabad', shortName: 'SRH', color: '#FF822E', secondaryColor: '#000000', logo: '🦅', matchesPlayed: 10, wins: 6, losses: 4, nrr: 0.072, points: 12 },
  { id: 'LSG', name: 'Lucknow Super Giants', shortName: 'LSG', color: '#44A0F9', secondaryColor: '#D1AC30', logo: '🏏', matchesPlayed: 10, wins: 6, losses: 4, nrr: 0.094, points: 12 },
  { id: 'DC', name: 'Delhi Capitals', shortName: 'DC', color: '#00008B', secondaryColor: '#FF0000', logo: '🐯', matchesPlayed: 11, wins: 5, losses: 6, nrr: -0.442, points: 10 },
  { id: 'PBKS', name: 'Punjab Kings', shortName: 'PBKS', color: '#ED1B24', secondaryColor: '#FFFFFF', logo: '🦁', matchesPlayed: 10, wins: 4, losses: 6, nrr: -0.062, points: 8 },
  { id: 'GT', name: 'Gujarat Titans', shortName: 'GT', color: '#0B2135', secondaryColor: '#D1AC30', logo: '⚡', matchesPlayed: 10, wins: 4, losses: 6, nrr: -1.113, points: 8 },
  { id: 'MI', name: 'Mumbai Indians', shortName: 'MI', color: '#004BA0', secondaryColor: '#D1AC30', logo: '🌪️', matchesPlayed: 11, wins: 3, losses: 8, nrr: -0.356, points: 6 },
  { id: 'RCB', name: 'Royal Challengers Bengaluru', shortName: 'RCB', color: '#EC1C24', secondaryColor: '#000000', logo: '🦁', matchesPlayed: 10, wins: 3, losses: 7, nrr: -0.415, points: 6 },
];

export const IPL_SCHEDULE: Match[] = [
  { id: 51, team1: 'MI', team2: 'KKR', date: '2024-05-03', venue: 'Wankhede', isCompleted: true, winnerId: 'KKR' },
  { id: 52, team1: 'RCB', team2: 'GT', date: '2024-05-04', venue: 'Bengaluru', isCompleted: false },
  { id: 53, team1: 'PBKS', team2: 'CSK', date: '2024-05-05', venue: 'Dharamsala', isCompleted: false },
  { id: 54, team1: 'LSG', team2: 'KKR', date: '2024-05-05', venue: 'Lucknow', isCompleted: false },
  { id: 55, team1: 'MI', team2: 'SRH', date: '2024-05-06', venue: 'Wankhede', isCompleted: false },
  { id: 56, team1: 'DC', team2: 'RR', date: '2024-05-07', venue: 'Delhi', isCompleted: false },
  { id: 57, team1: 'SRH', team2: 'LSG', date: '2024-05-08', venue: 'Hyderabad', isCompleted: false },
  { id: 58, team1: 'PBKS', team2: 'RCB', date: '2024-05-09', venue: 'Dharamsala', isCompleted: false },
  { id: 59, team1: 'GT', team2: 'CSK', date: '2024-05-10', venue: 'Ahmedabad', isCompleted: false },
  { id: 60, team1: 'KKR', team2: 'MI', date: '2024-05-11', venue: 'Eden Gardens', isCompleted: false },
  { id: 61, team1: 'CSK', team2: 'RR', date: '2024-05-12', venue: 'Chennai', isCompleted: false },
  { id: 62, team1: 'RCB', team2: 'DC', date: '2024-05-12', venue: 'Bengaluru', isCompleted: false },
  { id: 63, team1: 'GT', team2: 'KKR', date: '2024-05-13', venue: 'Ahmedabad', isCompleted: false },
  { id: 64, team1: 'DC', team2: 'LSG', date: '2024-05-14', venue: 'Delhi', isCompleted: false },
  { id: 65, team1: 'RR', team2: 'PBKS', date: '2024-05-15', venue: 'Guwahati', isCompleted: false },
  { id: 66, team1: 'SRH', team2: 'GT', date: '2024-05-16', venue: 'Hyderabad', isCompleted: false },
  { id: 67, team1: 'MI', team2: 'LSG', date: '2024-05-17', venue: 'Wankhede', isCompleted: false },
  { id: 68, team1: 'RCB', team2: 'CSK', date: '2024-05-18', venue: 'Bengaluru', isCompleted: false },
  { id: 69, team1: 'SRH', team2: 'PBKS', date: '2024-05-19', venue: 'Hyderabad', isCompleted: false },
  { id: 70, team1: 'RR', team2: 'KKR', date: '2024-05-19', venue: 'Guwahati', isCompleted: false },
];
