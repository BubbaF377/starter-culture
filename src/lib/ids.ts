// 6-character IDs the studio hands out (Client IDs, Tester IDs) -- short
// enough to type. Callers create the doc in a transaction that fails if the ID
// is already taken, and retry. See docs/PRODUCT.md items 10 and 13.
const ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => ID_CHARS[b % ID_CHARS.length]).join('');
}
