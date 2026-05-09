/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Team, Match } from '../types/ipl';

export const IPL_TEAMS: Team[] = [
  { id: 'RR', name: 'Rajasthan Royals', shortName: 'RR', color: '#EA1B85', secondaryColor: '#254AA5', logo: 'https://upload.wikimedia.org/wikipedia/en/6/60/Rajasthan_Royals_Logo.svg', matchesPlayed: 12, wins: 9, losses: 3, nrr: 0.850, points: 18 },
  { id: 'KKR', name: 'Kolkata Knight Riders', shortName: 'KKR', color: '#3A225D', secondaryColor: '#B3A123', logo: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.svg', matchesPlayed: 12, wins: 8, losses: 4, nrr: 1.100, points: 16 },
  { id: 'SRH', name: 'Sunrisers Hyderabad', shortName: 'SRH', color: '#FF822E', secondaryColor: '#000000', logo: 'https://upload.wikimedia.org/wikipedia/en/8/81/Sunrisers_Hyderabad_Logo.svg', matchesPlayed: 11, wins: 7, losses: 4, nrr: 0.650, points: 14 },
  { id: 'CSK', name: 'Chennai Super Kings', shortName: 'CSK', color: '#FDB913', secondaryColor: '#0081C5', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg', matchesPlayed: 12, wins: 7, losses: 5, nrr: 0.420, points: 14 },
  { id: 'LSG', name: 'Lucknow Super Giants', shortName: 'LSG', color: '#0057E2', secondaryColor: '#FF4B4B', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Lucknow_Super_Giants_Logo.svg', matchesPlayed: 12, wins: 6, losses: 6, nrr: -0.150, points: 12 },
  { id: 'DC', name: 'Delhi Capitals', shortName: 'DC', color: '#005C9C', secondaryColor: '#EF1B23', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f5/Delhi_Capitals_Logo.svg', matchesPlayed: 12, wins: 6, losses: 6, nrr: -0.320, points: 12 },
  { id: 'RCB', name: 'Royal Challengers Bengaluru', shortName: 'RCB', color: '#2B2A29', secondaryColor: '#EC1C24', logo: 'https://upload.wikimedia.org/wikipedia/en/2/24/Royal_Challengers_Bangalore_logo.svg', matchesPlayed: 11, wins: 5, losses: 6, nrr: 0.210, points: 10 },
  { id: 'GT', name: 'Gujarat Titans', shortName: 'GT', color: '#1B2133', secondaryColor: '#E3A857', logo: 'https://upload.wikimedia.org/wikipedia/en/0/09/Gujarat_Titans_Logo.svg', matchesPlayed: 11, wins: 4, losses: 7, nrr: -0.850, points: 8 },
  { id: 'PBKS', name: 'Punjab Kings', shortName: 'PBKS', color: '#ED1B24', secondaryColor: '#D1D1D1', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg', matchesPlayed: 11, wins: 4, losses: 7, nrr: -0.420, points: 8 },
  { id: 'MI', name: 'Mumbai Indians', shortName: 'MI', color: '#004BA0', secondaryColor: '#D1AB3E', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg', matchesPlayed: 12, wins: 3, losses: 9, nrr: -0.950, points: 6 },
];

export const IPL_SCHEDULE: Match[] = [
  // Completed Matches (Samples for 2026)
  { id: 1, team1: 'CSK', team2: 'RCB', date: '2026-03-22', venue: 'Chennai', isCompleted: true, winnerId: 'CSK' },
  { id: 2, team1: 'PBKS', team2: 'DC', date: '2026-03-23', venue: 'Mohali', isCompleted: true, winnerId: 'PBKS' },
  { id: 3, team1: 'KKR', team2: 'SRH', date: '2026-03-23', venue: 'Kolkata', isCompleted: true, winnerId: 'KKR' },
  { id: 4, team1: 'RR', team2: 'LSG', date: '2026-03-24', venue: 'Jaipur', isCompleted: true, winnerId: 'RR' },
  { id: 5, team1: 'GT', team2: 'MI', date: '2026-03-24', venue: 'Ahmedabad', isCompleted: true, winnerId: 'GT' },
  { id: 10, team1: 'KKR', team2: 'RCB', date: '2026-03-29', venue: 'Bengaluru', isCompleted: true, winnerId: 'KKR' },
  { id: 15, team1: 'RCB', team2: 'LSG', date: '2026-04-02', venue: 'Bengaluru', isCompleted: true, winnerId: 'LSG' },
  { id: 20, team1: 'MI', team2: 'DC', date: '2026-04-07', venue: 'Wankhede', isCompleted: true, winnerId: 'MI' },
  { id: 30, team1: 'RR', team2: 'KKR', date: '2026-04-16', venue: 'Kolkata', isCompleted: true, winnerId: 'RR' },
  { id: 40, team1: 'DC', team2: 'GT', date: '2026-04-24', venue: 'Delhi', isCompleted: true, winnerId: 'DC' },
  { id: 50, team1: 'SRH', team2: 'RR', date: '2026-05-02', venue: 'Hyderabad', isCompleted: true, winnerId: 'RR' },
  
  // Upcoming / Simulation Targets (Match 51 onwards)
  { id: 51, team1: 'MI', team2: 'KKR', date: '2026-05-03', venue: 'Wankhede', isCompleted: false },
  { id: 52, team1: 'RCB', team2: 'GT', date: '2026-05-04', venue: 'Bengaluru', isCompleted: false },
  { id: 53, team1: 'PBKS', team2: 'CSK', date: '2026-05-05', venue: 'Dharamsala', isCompleted: false },
  { id: 54, team1: 'LSG', team2: 'KKR', date: '2026-05-05', venue: 'Lucknow', isCompleted: false },
  { id: 55, team1: 'MI', team2: 'SRH', date: '2026-05-06', venue: 'Wankhede', isCompleted: false },
  { id: 56, team1: 'DC', team2: 'RR', date: '2026-05-07', venue: 'Delhi', isCompleted: false },
  { id: 57, team1: 'SRH', team2: 'LSG', date: '2026-05-08', venue: 'Hyderabad', isCompleted: false },
  { id: 58, team1: 'PBKS', team2: 'RCB', date: '2026-05-09', venue: 'Dharamsala', isCompleted: false },
  { id: 59, team1: 'GT', team2: 'CSK', date: '2026-05-10', venue: 'Ahmedabad', isCompleted: false },
  { id: 60, team1: 'KKR', team2: 'MI', date: '2026-05-11', venue: 'Eden Gardens', isCompleted: false },
  { id: 61, team1: 'CSK', team2: 'RR', date: '2026-05-12', venue: 'Chennai', isCompleted: false },
  { id: 62, team1: 'RCB', team2: 'DC', date: '2026-05-12', venue: 'Bengaluru', isCompleted: false },
  { id: 63, team1: 'GT', team2: 'KKR', date: '2026-05-13', venue: 'Ahmedabad', isCompleted: false },
  { id: 64, team1: 'DC', team2: 'LSG', date: '2026-05-14', venue: 'Delhi', isCompleted: false },
  { id: 65, team1: 'RR', team2: 'PBKS', date: '2026-05-15', venue: 'Guwahati', isCompleted: false },
  { id: 66, team1: 'SRH', team2: 'GT', date: '2026-05-16', venue: 'Hyderabad', isCompleted: false },
  { id: 67, team1: 'MI', team2: 'LSG', date: '2026-05-17', venue: 'Wankhede', isCompleted: false },
  { id: 68, team1: 'RCB', team2: 'CSK', date: '2026-05-18', venue: 'Bengaluru', isCompleted: false },
  { id: 69, team1: 'SRH', team2: 'PBKS', date: '2026-05-19', venue: 'Hyderabad', isCompleted: false },
  { id: 70, team1: 'RR', team2: 'KKR', date: '2026-05-19', venue: 'Guwahati', isCompleted: false },
];
