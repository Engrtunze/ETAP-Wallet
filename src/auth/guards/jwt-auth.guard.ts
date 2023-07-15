import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtPayload } from '../jwt-payload';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    if (requiredRoles.includes('admin') && user.isAdmin) {
      return true; // Allow access for admin role
    }

    if (requiredRoles.includes('user') && !user.isAdmin) {
      return true; // Allow access for non-admin role
    }
  }
}
