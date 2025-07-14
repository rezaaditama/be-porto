export const calculatePercentage = (
  data: Record<string, number>
): Record<string, number> => {
  const total = Object.values(data).reduce((acc, val) => acc + val, 0);
  const percentages: Record<string, number> = {};

  for (const [key, value] of Object.entries(data)) {
    percentages[key] = parseFloat(((value / total) * 100).toFixed(2));
  }

  return percentages;
};
