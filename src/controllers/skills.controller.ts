import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { fetchAllSkillService } from '../services/skills.service';

export const getAllSkillController = async (req: Request, res: Response) => {
  try {
    const data = await fetchAllSkillService();
    logger.info('Semua Skill Telah Dikirim');
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Get All Skill',
      data: data,
    });
  } catch (error) {
    logger.error({
      status: false,
      message: 'Gagal Mengambil Data Skill',
      error,
      endpoint: req.originalUrl,
      method: req.method,
    });
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Gagal Mengambil Data Skill',
    });
  }
};
