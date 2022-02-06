import Complex from "./Complex";

export const demandTarget = [
  {time: 0, P: 6.2420, Q: -0.9484},
  {time: 1, P: 6.0160, Q: -1.0226},
  {time: 2, P: 5.9420, Q: -1.0470},
  {time: 3, P: 5.9280, Q: -1.0516},
  {time: 4, P: 6.0460, Q: -1.0128},
  {time: 5, P: 6.5520, Q: -0.8465},
  {time: 6, P: 7.6100, Q: -0.4987},
  {time: 7, P: 8.5080, Q: -0.2036},
  {time: 8, P: 9.0300, Q: -0.0320},
  {time: 9, P: 9.1820, Q: 0.0180},
  {time: 10, P: 8.9660, Q: -0.0530},
  {time: 11, P: 8.7680, Q: -0.1181},
  {time: 12, P: 8.3620, Q: -0.2515},
  {time: 13, P: 8.3660, Q: -0.2502},
  {time: 14, P: 8.2320, Q: -0.2943},
  {time: 15, P: 8.2820, Q: -0.2778},
  {time: 16, P: 8.6880, Q: -0.1444},
  {time: 17, P: 9.1420, Q: 0.0048},
  {time: 18, P: 9.2280, Q: 0.0331},
  {time: 19, P: 9.0580, Q: -0.0228},
  {time: 20, P: 8.8040, Q: -0.1063},
  {time: 21, P: 8.3580, Q: -0.2529},
  {time: 22, P: 7.8020, Q: -0.4356},
  {time: 23, P: 7.2940, Q: -0.6026},
  {time: 24, P: 6.2420, Q: -0.9484},
];

export const voltageRangeLower = [
  {time: 0, V: 95},
  {time: 24, V: 95}
];

export const voltageRangeUpper = [
  {time: 0, V: 107},
  {time: 24, V: 107}
];

export const defaultAdmitancesRe = [
  [0,      1.1725, 0],
  [1.1725, 0,      4.7245],
  [0,      4.7245, 0]
];

export const defaultAdmitancesIm = [
  [  0,     -29.571,   0],
  [-29.571,   0,     -65.667],
  [  0,     -65.667,   0]
];
