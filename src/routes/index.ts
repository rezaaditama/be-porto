import { Application, Router } from 'express';
import { SkillsRouter } from './skills.route';

const _routes: Array<[string, Router]> = [['/skills', SkillsRouter]];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(`/api${url}`, router);
  });
};
