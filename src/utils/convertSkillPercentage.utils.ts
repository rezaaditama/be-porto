import { LanguagePercentage } from '../types/github.type';

export const calculatePercentageUtils = (
  languageTotal: Record<string, number>
): LanguagePercentage[] => {
  const totalByte = Object.values(languageTotal).reduce(
    (acc, byte) => acc + byte,
    0
  );

  return Object.entries(languageTotal).map(([language, bytes]) => ({
    language,
    percentage: parseFloat(((bytes / totalByte) * 100).toFixed(2)),
  }));
};
