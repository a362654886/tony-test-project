export const getTimeDiff = (
  _countTime: Date,
  _startTime: Date,
  precision: number
) => {
  const timeDiff = Math.abs(_countTime.getTime() - _startTime.getTime());
  return timeDiff / precision;
};
