/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function getNRRColor(nrr: number): string {
  if (nrr > 0) return 'text-emerald-400';
  if (nrr < 0) return 'text-rose-400';
  return 'text-zinc-400';
}
