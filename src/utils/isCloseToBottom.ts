export const CLOSE_TO_BOTTOM_OFFSET = 10;

export const isCloseToBottom = (
  {
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: {
    layoutMeasurement: {height: number};
    contentOffset: {y: number};
    contentSize: {height: number};
  },
  offset = CLOSE_TO_BOTTOM_OFFSET,
): boolean => {
  return (
    layoutMeasurement.height + contentOffset.y >= contentSize.height - offset
  );
};
