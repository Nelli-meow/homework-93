import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const token = req.get('Authorization');

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user: UserDocument | null = await this.userModel.findOne({ token });

    if (!user) {
      throw new UnauthorizedException('Invalid token :(');
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException(
        'You dont have permission to perform this action.',
      );
    }

    return true;
  }
}
