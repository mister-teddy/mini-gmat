export function randomNumber(from: number, to: number) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

export function randomData(length: number, from: number = 0, to: number = 100) {
  return new Array(length).fill(0).map((_) => randomNumber(from, to));
}

export function round(number: number, fraction: number) {
  return Math.round(number * Math.pow(10, fraction)) / Math.pow(10, fraction);
}
