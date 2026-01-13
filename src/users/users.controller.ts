import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { User } from './users.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

// @UseGuards(AuthGuard) - コントローラー全体にAPI Key認証を適用
// @UseGuards(AuthGuard, RolesGuard) - 複数のガードを適用（左から順に実行）
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  // GET /users/search?name=xxx
  @Get('search')
  search(@Query('name') name: string): User[] {
    return this.usersService.search(name);
  }

  // GET /users/:id - ParseIntPipeで自動的に数値変換
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.findOne(id);
  }

  // POST /users - DTOでバリデーション
  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto.name, createUserDto.email);
  }

  // PUT /users/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; email?: string },
  ): User | undefined {
    return this.usersService.update(id, body);
  }

  // DELETE /users/:id - 管理者のみ削除可能
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number): { deleted: boolean } {
    const result = this.usersService.remove(id);
    return { deleted: result };
  }
}
