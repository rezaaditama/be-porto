import { fetchGithubRepoService } from './src/services/github.service';
import { saveSkillDbService } from './src/services/skills.service';

const run = async () => {
  const result = await fetchGithubRepoService();
  await saveSkillDbService(result);
};

run();
