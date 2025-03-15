import { FastifyRequest } from 'fastify';
import { UserRole } from 'src/modules/auth/types';

export type AppRequest = FastifyRequest & {
  userId: string;
  role: UserRole;
};
