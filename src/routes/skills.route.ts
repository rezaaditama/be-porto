import { Router } from 'express';
import { getAllSkillController } from '../controllers/skills.controller';

export const SkillsRouter: Router = Router();

SkillsRouter.get('/', getAllSkillController);
