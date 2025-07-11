import { Application, Router } from 'express';
import { HealthRouter } from './health.route';
import { ProductRouter } from './product.route';
import { SkillsRouter } from './skills.route';

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter],
  ['/skills', SkillsRouter],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(`/api${url}`, router);
  });
};
