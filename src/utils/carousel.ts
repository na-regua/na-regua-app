export const findNextNearestMultiple = (
  targetNumber: number,
  multiple: number,
): number => {
  const quotient = Math.ceil((targetNumber + 1) / multiple);
  const nextNearestMultiple = multiple * quotient;
  return nextNearestMultiple;
};

export const findPreviousMultiple = (
  targetNumber: number,
  multiple: number,
): number => {
  const quotient = Math.floor((targetNumber - 1) / multiple);
  const previousMultiple = multiple * quotient;
  return previousMultiple;
};
