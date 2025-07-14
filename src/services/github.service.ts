import dotenv from 'dotenv';
import { calculatePercentage } from '../utils/convertSkillPercentage.utils';
import { LanguagePercentage } from '../types/github.type';
dotenv.config();

export const fetchGithubRepoService = async <T = unknown>(): Promise<
  T[] | undefined
> => {
  const token = process.env.GITHUB_TOKEN;
  try {
    if (!token) {
      throw new Error('GITHUB_TOKEN tidak ditemukan di .env');
    }
    const response = await fetch(
      'https://api.github.com/user/repos?visibility=public&affiliation=owner',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error saat fetching data github : ', error);
  }
};

export const getLanguagePercentageService = async (): Promise<
  Record<string, number>
> => {
  const repos = await fetchGithubRepoService<LanguagePercentage>();
  const totalLanguages: Record<string, number> = {};

  if (!repos) return {};

  await Promise.all(
    repos.map(async (repo) => {
      try {
        const response = await fetch(repo.languages_url);
        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Error from ${repo.name}: ${response.status} - ${errorText}`
          );
          return;
        }
        const data: Record<string, number> = await response.json();
        for (const [lang, bytes] of Object.entries(data)) {
          totalLanguages[lang] = (totalLanguages[lang] || 0) + bytes;
        }
      } catch (error) {
        console.log(`Gagal mengambil bahasa dari ${repo.name}`, error);
      }
    })
  );

  const percentages = calculatePercentage(totalLanguages);
  return percentages;
};
