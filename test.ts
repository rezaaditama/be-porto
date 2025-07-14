import { getLanguagePercentageService } from './src/services/github.service';
(async () => {
  try {
    const repos = await getLanguagePercentageService();

    console.log(repos);
  } catch (error) {
    console.error('Error fetching repos:', error);
  }
})();
