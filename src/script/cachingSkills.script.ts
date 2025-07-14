import { prisma } from '../../prisma/client';
import { getLanguagePercentageService } from '../services/github.service';

const catchingSkills = async () => {
  try {
    const skills = await getLanguagePercentageService();
    for (const [name, percentage] of Object.entries(skills) as [
      string,
      number,
    ][]) {
      await prisma.skill.upsert({
        where: { name },
        update: { percentage },
        create: { name, percentage },
      });
    }
    console.log('Skills berhasil di update');
  } catch (error) {
    console.log('Gagal menyimpan skill ke database :', error);
  } finally {
    await prisma.$disconnect();
  }
};
