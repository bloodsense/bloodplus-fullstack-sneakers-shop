import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';

@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  @Auth()
  @Patch('profile/favorites/:sneakerSlug')
  async addFavorites(
    @CurrentUser('id') userId: string,
    @Param('sneakerSlug') sneakerSlug: string,
  ) {
    return this.userService.addFavorites(userId, sneakerSlug);
  }
}
