import { prisma } from '../../prisma/client';

export const getAllSkills = async () => {
  try {
    const skills = await prisma.skill.findMany();
    return skills;
  } catch (error) {
    console.log('error : ', error);
    throw new Error('Error nich');
  }
};
