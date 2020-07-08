export default function isEqual(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

export function isDifferent(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    (a.length !== b.length || a.some((val) => !b.includes(val)))
  );
}
