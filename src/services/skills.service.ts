import { LanguagePercentage } from '../types/github.type';
import { prisma } from '../../prisma/client';

export const saveSkillDbService = async (languages: LanguagePercentage[]) => {
  try {
    for (const data of languages) {
      await prisma.skill.upsert({
        where: {
          language: data.language,
        },
        update: {
          percentage: data.percentage,
          createdAt: new Date(),
        },
        create: {
          language: data.language,
          percentage: data.percentage,
        },
      });
    }
    console.log(`Bahasa Berhasil Di Perbarui`);
  } catch (error) {
    console.error('Gagal Menyimpan Data Bahasa : ', error);
  }
};

export const fetchAllSkillService = async () => {
  return await prisma.skill.findMany({
    orderBy: {
      percentage: 'desc',
    },
  });
};
