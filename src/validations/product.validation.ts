import { z } from 'zod';

export const createProductValidation = z.object({
  name: z.string(),
  price: z.number().optional(),
});

export type CreateProductValidation = z.infer<typeof createProductValidation>;
