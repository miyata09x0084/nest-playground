import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../common/logger.service';
import { UserNotFoundException } from '../common/exceptions/not-found.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly context = 'UsersService';

  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
  ) {}

  // 全ユーザー取得
  async findAll(): Promise<User[]> {
    this.logger.log(this.context, 'Finding all users');
    return this.prisma.user.findMany();
  }

  // 名前で検索
  async search(name: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  // ID指定で取得（見つからない場合は例外をスロー）
  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  // 新規作成
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    this.logger.log(this.context, `Created user: ${user.id} - ${user.name}`);
    return user;
  }

  // 更新
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // まず存在確認
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // 削除
  async remove(id: number): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }

  // メールアドレスでユーザー検索（認証用）
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // パスワード付きユーザー作成（登録用）
  async createWithPassword(
    name: string,
    email: string,
    hashedPassword: string,
    role: string = 'user',
  ): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    this.logger.log(this.context, `Registered user: ${user.id} - ${user.email}`);
    return user;
  }
}
