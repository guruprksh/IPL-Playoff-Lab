/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { IPL_TEAMS } from '../data/mockData';

interface ProbabilityChartProps {
  probabilities: Record<string, number>;
}

export function ProbabilityChart({ probabilities }: ProbabilityChartProps) {
  const data = IPL_TEAMS.map(team => ({
    name: team.shortName,
    prob: probabilities[team.id] || 0,
    color: team.color
  })).sort((a, b) => b.prob - a.prob);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }}
            domain={[0, 100]}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ 
              backgroundColor: '#0a0a0c', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '8px', 
              fontSize: '10px',
              fontFamily: 'monospace'
            }}
            itemStyle={{ color: '#06b6d4' }}
          />
          <Bar dataKey="prob" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.6} stroke={entry.color} strokeWidth={1} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
