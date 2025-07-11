import { Request, Response } from 'express';
import { getAllSkills } from '../services/skills.service';

export const getAllSkillController = async (req: Request, res: Response) => {
  try {
    const data = await getAllSkills();
    return res.status(200).json({ status: true, statusCode: 200, data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, statusCode: 500, message: `Gagal : ${error}` });
  }
};
