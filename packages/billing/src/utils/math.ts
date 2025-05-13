export const round = (n: number, precision = 2) =>
  Math.round(n * 10 ** precision) / 10 ** precision;
