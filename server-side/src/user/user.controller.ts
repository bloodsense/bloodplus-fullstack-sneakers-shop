import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  @Auth()
  @Patch('profile/favorites:sneakerId')
  async addFavorites(
    @CurrentUser('id') userId: string,
    @Param('sneakerId') sneakerId: string,
  ) {
    return this.userService.addFavorites(sneakerId, userId);
  }
}
