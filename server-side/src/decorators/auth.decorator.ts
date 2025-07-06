import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from 'generated/prisma';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from './roles.decorator';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard), Roles(...roles));
}
