const NOTES = [
  'c5',
  'c5#',
  'd5',
  'd5#',
  'e5',
  'f5',
  'f5#',
  'g5',
  'g5#',
  'a5',
  'a5#',
  'b5',
  'c6',
]

const KEY_TO_NOTE = {
  z: 'c5',
  s: 'c5#',
  x: 'd5',
  d: 'd5#',
  c: 'e5',
  v: 'f5',
  g: 'f5#',
  b: 'g5',
  h: 'g5#',
  n: 'a5',
  j: 'a5#',
  m: 'b5',
  ',': 'c6',
}

const NOTE_TO_KEY = {
  c5: 'z',
  'c5#': 's',
  d5: 'x',
  'd5#': 'd',
  e5: 'c',
  f5: 'v',
  'f5#': 'g',
  g5: 'b',
  'g5#': 'h',
  a5: 'n',
  'a5#': 'j',
  b5: 'm',
  c6: ',',
}
const VALID_BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']
const VALID_WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',']
const VALID_KEYS = [...VALID_BLACK_KEYS, ...VALID_WHITE_KEYS]

export { NOTES, NOTE_TO_KEY, KEY_TO_NOTE, VALID_KEYS }
