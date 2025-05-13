/**
 * 計算 `needle` 在 `haystack` 中出現的次數。
 * @example
 *   countOccurrences("hello world", "l") // 3
 */
export function countOccurrences(
  haystack: string,
  needle: string
): number {
  if (needle === "") return 0;
  return haystack.split(needle).length - 1;
}
