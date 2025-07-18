import dotenv from 'dotenv';
import { githubRequest } from '../utils/githubRequest.utils';
import { GithubRepo, LanguagePercentage } from '../types/github.type';
import { calculatePercentageUtils } from '../utils/convertSkillPercentage.utils';
dotenv.config();

export const fetchGithubRepoService = async (): Promise<
  LanguagePercentage[]
> => {
  try {
    const repoUrl =
      'https://api.github.com/user/repos?visibility=public&affiliation=owner&per_page=100';
    const repoGithub = await githubRequest<GithubRepo[]>(repoUrl);

    const languageTotal: Record<string, number> = {};

    await Promise.all(
      repoGithub
        .filter((repo) => !repo.fork)
        .map(async (repo) => {
          try {
            const languageData = await githubRequest<Record<string, number>>(
              repo.languages_url
            );

            for (const [language, bytes] of Object.entries(languageData)) {
              languageTotal[language] = (languageTotal[language] || 0) + bytes;
            }
          } catch (error) {
            console.error(
              `Gagal mengambil bahasa dari repo ${repo.name}`,
              error
            );
          }
        })
    );

    return calculatePercentageUtils(languageTotal);
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data GitHub:', error);
    return [];
  }
};
