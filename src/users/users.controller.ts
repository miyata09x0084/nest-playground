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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { User } from './users.service';

@Controller('users')
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
  findOne(@Param('id', ParseIntPipe) id: number): User | undefined {
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

  // DELETE /users/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { deleted: boolean } {
    const result = this.usersService.remove(id);
    return { deleted: result };
  }
}
